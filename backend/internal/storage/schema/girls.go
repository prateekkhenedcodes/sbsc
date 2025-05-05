package schema

import "database/sql"

func CreateGirlsTable(db *sql.DB) error {
	imageTable := `CREATE TABLE IF NOT EXISTS g_images (
		id TEXT PRIMARY KEY,
		created_at TEXT NOT NULL,
		updated_at TEXT NOT NULL,
		name TEXT NOT NULL,
		passout_year INTEGER NOT NULL, 
		gender TEXT NOT NULL,
		branch TEXT NOT NULL, 
		description TEXT,
		image_url TEXT NOT NULL
	);`

	_, err := db.Exec(imageTable)
	if err != nil {
		return err
	}

	return nil
}
