package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type Info struct {
	Name    string `json:"name"`
	Version string `json:"version"`
	Author  string `json:"author"`
	License string `json:"license"`
}

func main() {
	pwd, _ := os.Getwd()

	banner := getBanner(pwd)

	files, errReadDir := os.ReadDir("lib")
	if errReadDir != nil {
		log.Fatal("-----", errReadDir)
	}

	var css = banner + "\n"
	var jsImport string

	var stringBuilder strings.Builder
	for _, file := range files {
		fileName := file.Name()
		if !(strings.Contains(fileName, "base") || strings.Contains(fileName, "index")) {
			css += fmt.Sprintf("@import './%v/style.css';\n", fileName)
			jsImport += fmt.Sprintf("import %v from './%v';\n", fileName, fileName)
			stringBuilder.WriteString(fileName + ",")
		}
	}
	sb := strings.TrimRight(stringBuilder.String(), ",")
	jsExportDefault := fmt.Sprintf("\nexport default { %v };", sb)
	jsExport := fmt.Sprintf("\nexport { %v };", sb)
	js := banner + jsImport + jsExportDefault + jsExport

	errCssWrite := os.WriteFile(filepath.Join(pwd, "lib/index.css"), []byte(css), 0666)
	if errCssWrite != nil {
		log.Fatal("css写入错误-----", errCssWrite)
	}

	errJsWrite := os.WriteFile(filepath.Join(pwd, "lib/index.js"), []byte(js), 0666)
	if errJsWrite != nil {
		log.Fatal("js写入错误-----", errJsWrite)
	}
	//copyFile(pwd)
}

func getBanner(pwd string) string {
	YEAR := time.Now().Year()
	var info Info
	jsonFile, errJson := os.Open(filepath.Join(pwd, "package.json"))
	if errJson != nil {
		log.Fatal("errJson-----", errJson)
	}
	defer jsonFile.Close()
	decoder := json.NewDecoder(jsonFile)
	errDecode := decoder.Decode(&info)
	if errDecode != nil {
		log.Fatal("errDecode-----", errDecode)
	}
	return fmt.Sprintf("/**\n* @%v v%v\n* (c) 2019-%v %v\n* Released under the %v License.\n* %v\n*/\n", info.Name, info.Version, YEAR, info.Author, info.License, time.Now().Format("2006.01.02 15:04:05"))
}

func copyFile(pwd string) {
	data, errRead := os.ReadFile(filepath.Join(pwd, "src/components/index.ts"))
	if errRead != nil {
		log.Fatal("-----", errRead)
	}
	errWrite := os.WriteFile(filepath.Join(pwd, "lib/index.d.ts"), data, 0666)
	if errWrite != nil {
		log.Fatal("-----", errWrite)
	}
}
