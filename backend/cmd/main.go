package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/prateekkhenedcodes/sbsc/internal/config"
	"github.com/prateekkhenedcodes/sbsc/internal/handlers"
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

	api := r.Group("/api")
	{
		api.GET("/healthz", handlers.Healthz)
		api.POST("/upload", handlers.Upload)
	}

	log.Printf("Starting the sever on port: %v", cfg.Port)
	if err := r.Run(cfg.Port); err != nil {
		log.Fatalf("failed to run the server on port: %v, error is: %v", cfg.Port, err)
	}
}
