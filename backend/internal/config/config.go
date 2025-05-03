package config

import (
	"os"

	"github.com/joho/godotenv"
)

type config struct {
	Port string
}

func Load() config {
	godotenv.Load("./backend/.env")

	port := os.Getenv("PORT")

	if port == "" {
		port = ":8080"
	}

	return config{
		Port: port,
	}
}
