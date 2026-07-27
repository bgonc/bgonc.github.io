# Excel Utils

A browser-based tool for working with Excel and CSV exports — combine files, filter rows, reshape data, and download the result, all without uploading anything to a server.

I originally built this to save time on repetitive reporting work. All processing happens in the browser using SheetJS, so it works offline and nothing leaves your machine.

Live at:
- **[bgonc.github.io/excel-utils](https://bgonc.github.io/excel-utils)**

---

## What it does

Upload one or more Excel/CSV files, configure how to combine and shape them, then download the result as `.xlsx`.

**Combine modes:**
- **Append rows**: stack multiple exports into one table
- **Join 2 files by key**: merge data using a matching key column (inner or left join)
- **Smart merge**: auto-detect common key columns and enrich a primary dataset

**Report types:**
- **Detailed**: row-by-row output — choose, rename, and reorder columns
- **Summary**: group by a column and aggregate values
- **Quarterly pivot**: T1/T2/T3/T4 + annual total

**Other features:**
- Auto-detect column headers
- Date range and custom filters
- Output sorting
- Preview before downloading
- Save and load your configuration as JSON
- Batch uploads — files are appended, not replaced

---

## Run locally

```bash
git clone https://github.com/bgonc/excel-utils.git
cd excel-utils
python3 -m http.server 8080
```

Open `http://localhost:8080/index.html` in your browser.

---

## Privacy

Everything runs client-side in the browser — no server upload. If you're working with sensitive data, just clear the downloaded files after use.

---

## Rabies Report Template

A prefilled workbook for the official rabies report format is included:

- [`templates/Reporte_Rabia_2025-12_para_completar.xlsx`](templates/Reporte_Rabia_2025-12_para_completar.xlsx)
- [`templates/Reporte_Rabia_2025-12_para_completar_v2.xlsx`](templates/Reporte_Rabia_2025-12_para_completar_v2.xlsx) (bold green header style)

Includes the official columns plus support columns for client/patient IDs and consultation info.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Author

[Bruno Goncalves](https://bgonc.github.io) · [github.com/bgonc](https://github.com/bgonc)
