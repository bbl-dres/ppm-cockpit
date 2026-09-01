# PM-Cockpit

![PM-Cockpit portfolio dashboard](assets/social-preview.jpg)

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f?logo=github&logoColor=white)](https://bbl-dres.github.io/ppm-cockpit/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> [!CAUTION]
> This is an unofficial mockup for demonstration purposes only. All records are fictional, not every function is implemented, and it is not intended for production use.

A browser-based portfolio dashboard for exploring Swiss federal construction projects in gallery, list, map, and detail views.

## Demo

**Live demo:** https://bbl-dres.github.io/ppm-cockpit/

<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
  <tr>
    <td width="50%" valign="top"><img src="assets/images/preview-1.jpg" alt="PPM Cockpit project gallery" width="100%"/></td>
    <td width="50%" valign="top"><img src="assets/images/preview-2.jpg" alt="PPM Cockpit project map" width="100%"/></td>
  </tr>
</table>

## Features

- Compare projects in responsive gallery, sortable list, and interactive map views.
- Search by project, location, region, or project lead.
- Filter by status, objectives, risks, portfolio, SIA phase, and BBL project lead.
- Review project goals, milestones, costs, risks, building metrics, and SIA 416 figures.
- Share filtered views and open project tabs through URL state.
- Use familiar Swiss project conventions, German labels, and CHF formatting.

## Run locally

The app loads `data.json`, so serve the repository over HTTP:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Documentation

- [Market screening](docs/MARKETSCREEN.md) — wider construction-software context behind the prototype.

## License

Licensed under the [MIT License](LICENSE).
