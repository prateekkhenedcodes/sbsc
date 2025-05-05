package query

import (
	"database/sql"
)

type GImage struct {
	ID          string
	CreatedAt   string
	UpdatedAt   string
	Name        string
	PassOutYear int
	Gender      string
	Branch      string
	Description string
	ImageURL    string
}

func AddGirlsImage(db *sql.DB,
	id string,
	created string,
	updated string,
	name string,
	po int,
	gender string,
	branch string,
	desc string,
	imageURL string,
) (GImage, error) {
	query := `INSERT INTO g_images(id, 
			created_at,
			updated_at, 
			name, 
			passout_year,
			gender, 
			branch, 
			description, 
			image_url )
			VALUES(?, ?, ?, ?, ?, ?, ?, ?)
			RETURNING *;`

	var gImage GImage
	err := db.QueryRow(query, id, created, updated, name, po, gender, branch, desc, imageURL).Scan(
		&gImage.ID, &gImage.CreatedAt, &gImage.UpdatedAt, &gImage.Name, &gImage.PassOutYear, &gImage.Gender, &gImage.Branch,
		&gImage.Description, &gImage.ImageURL,
	)
	if err != nil {
		return GImage{}, err
	}

	return gImage, nil

}
