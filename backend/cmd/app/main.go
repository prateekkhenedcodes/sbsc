package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/prateekkhenedcodes/sbsc/internal/config"
)

func main() {
	r := gin.Default()

	cfg := config.Load()

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "homepage for now",
		})
	})

	port := cfg.Port

	r.Run(port)
}
