package handlers

import (
	"context"
	"database/sql"
	"encoding/json"
	"io"
	"net/http"
	"path/filepath"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"google.golang.org/api/option"
)

type Response struct {
	ID          string `json:"id"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
	Name        string `json:"name"`
	PassOutYear int    `json:"passout_year"`
	Gender      string `json:"gender"`
	Branch      string `json:"branch"`
	Description string `json:"description"`
}

func Upload(ctx *gin.Context, db *sql.DB) {

	r := ctx.Request
	r.Body = http.MaxBytesReader(ctx.Writer, r.Body, 10<<23)

	const maxMemory = 10 << 20
	err := r.ParseMultipartForm(maxMemory)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "could not parse the multipart form" + err.Error(),
		})
		return
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "could not retrieve the image" + err.Error(),
		})
		return
	}
	defer file.Close()

	jsonData := r.FormValue("data")
	if jsonData == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "No JSON data found",
		})
		return
	}

	var responseData Response
	err = json.Unmarshal([]byte(jsonData), &responseData)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to unmarshal JSON: " + err.Error(),
		})
		return
	}

	mediaType := header.Header.Get("Content-Type")

	if mediaType != "image/jpg" && mediaType != "image/png" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "is not the right media type",
		})
		return
	}

	ext := filepath.Ext(header.Filename)
	object := uuid.New().String() + ext
	bucket := "sbsc-54321"

	c := context.Background()

	pathToKey := "../../keys.json"

	storageClient, err := storage.NewClient(c, option.WithCredentialsFile(pathToKey))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "could not create a client: " + err.Error(),
		})
		return
	}

	sw := storageClient.Bucket(bucket).Object(object).NewWriter(c)

	sw.ContentType = mediaType

	if _, err := io.Copy(sw, file); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "could not upload the file to GCS: " + err.Error(),
		})
		return
	}

	if err := sw.Close(); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "could not close the writer" + err.Error(),
		})
		return
	}

	fileURL := "https://storage.googleapis.com/" + bucket + "/" + object

	ctx.JSON(http.StatusOK, gin.H{
		"message": "file uploaded successfully",
		"path":    fileURL,
		"data":    responseData,
	})

}

func UploadHandler(db *sql.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		Upload(ctx, db)
	}
}
