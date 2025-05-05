package handlers

import (
	"context"
	"io"
	"net/http"
	"path/filepath"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"google.golang.org/api/option"
)

func Upload(ctx *gin.Context) {
	r := ctx.Request
	r.Body = http.MaxBytesReader(ctx.Writer, r.Body, 10<<23)

	const maxMemory = 10 << 20
	err := ctx.Request.ParseMultipartForm(maxMemory)
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

	pathToKey := "/home/suresh/workspace/github.com/prateekkhenedcodes/sbsc/backend/keys.json"

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
	})

}
