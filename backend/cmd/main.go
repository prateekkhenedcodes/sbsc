package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/prateekkhenedcodes/sbsc/internal/config"
	"github.com/prateekkhenedcodes/sbsc/internal/storage/schema"
)

func main() {

	r := gin.Default()

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load configuration: %v", err)
	}

	err = schema.CreateGirlsTable(cfg.Db)
	if err != nil {
		log.Fatalf("could not create girls table: %v", err)
	}

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "homepage for now",
		})
	})

	log.Printf("Starting the sever on port: %v", cfg.Port)
	r.Run(cfg.Port)
}
