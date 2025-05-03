package config

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"
)

type Config struct {
	Port string
	Db   *sql.DB
}

func Load() (Config, error) {
	err := godotenv.Load("../.env")
	if err != nil {
		return Config{}, fmt.Errorf("could not load the env file")
	}

	port := os.Getenv("PORT")

	if port == "" {
		return Config{}, fmt.Errorf("PORT in .env is empty ")
	}

	db, err := sql.Open("sqlite3", "../sbsc.sqlite")
	if err != nil {
		return Config{}, err
	}

	return Config{
		Port: port,
		Db:   db,
	}, nil
}
