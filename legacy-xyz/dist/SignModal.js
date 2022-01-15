/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import { verify, sign } from "./utils/utils";

/* babel-plugin-inline-import './utils/metamask.svg' */
const metamask = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNTQ5LjQgNDgwIgoJIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1NDkuNCA0ODA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMTYxNjE2O30KCS5zdDF7ZmlsbDojRTE3NzI2O3N0cm9rZTojRTE3NzI2O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Qye2ZpbGw6I0UyNzYyNTtzdHJva2U6I0UyNzYyNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0M3tmaWxsOiNENUJGQjI7c3Ryb2tlOiNENUJGQjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDR7ZmlsbDojMjMzNDQ3O3N0cm9rZTojMjMzNDQ3O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Q1e2ZpbGw6I0NDNjIyODtzdHJva2U6I0NDNjIyODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0NntmaWxsOiNFMjc1MjU7c3Ryb2tlOiNFMjc1MjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDd7ZmlsbDojRjU4NDFGO3N0cm9rZTojRjU4NDFGO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Q4e2ZpbGw6I0MwQUM5RDtzdHJva2U6I0MwQUM5RDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0OXtmaWxsOiMxNjE2MTY7c3Ryb2tlOiMxNjE2MTY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDEwe2ZpbGw6Izc2M0UxQTtzdHJva2U6Izc2M0UxQTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjc2LjYsMjQwLjdjLTYuOC00LjUtMTQuMy03LjctMjEuNC0xMS43Yy00LjYtMi42LTkuNS00LjktMTMuNS04LjJjLTYuOC01LjYtNS40LTE2LjYsMS43LTIxLjQKCQljMTAuMi02LjgsMjcuMS0zLDI4LjksMTAuOWMwLDAuMywwLjMsMC41LDAuNiwwLjVoMTUuNGMwLjQsMCwwLjctMC4zLDAuNi0wLjdjLTAuOC05LjYtNC41LTE3LjYtMTEuMy0yMi43CgkJYy02LjUtNC45LTEzLjktNy41LTIxLjgtNy41Yy00MC43LDAtNDQuNCw0My4xLTIyLjUsNTYuN2MyLjUsMS42LDI0LDEyLjQsMzEuNiwxNy4xYzcuNiw0LjcsMTAsMTMuMyw2LjcsMjAuMQoJCWMtMyw2LjItMTAuOCwxMC41LTE4LjYsMTBjLTguNS0wLjUtMTUuMS01LjEtMTcuNC0xMi4zYy0wLjQtMS4zLTAuNi0zLjgtMC42LTQuOWMwLTAuMy0wLjMtMC42LTAuNi0wLjZoLTE2LjcKCQljLTAuMywwLTAuNiwwLjMtMC42LDAuNmMwLDEyLjEsMywxOC44LDExLjIsMjQuOWM3LjcsNS44LDE2LjEsOC4yLDI0LjgsOC4yYzIyLjgsMCwzNC42LTEyLjksMzctMjYuMwoJCUMxMjkyLjIsMjYwLjMsMTI4OC4zLDI0OC41LDEyNzYuNiwyNDAuN3oiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01NTEuNSwxODIuMWgtNy40aC04LjFjLTAuMywwLTAuNSwwLjItMC42LDAuNGwtMTMuNyw0NS4yYy0wLjIsMC42LTEsMC42LTEuMiwwbC0xMy43LTQ1LjIKCQljLTAuMS0wLjMtMC4zLTAuNC0wLjYtMC40aC04LjFoLTcuNGgtMTBjLTAuMywwLTAuNiwwLjMtMC42LDAuNnYxMTUuNGMwLDAuMywwLjMsMC42LDAuNiwwLjZoMTYuN2MwLjMsMCwwLjYtMC4zLDAuNi0wLjZ2LTg3LjcKCQljMC0wLjcsMS0wLjgsMS4yLTAuMmwxMy44LDQ1LjVsMSwzLjJjMC4xLDAuMywwLjMsMC40LDAuNiwwLjRoMTIuOGMwLjMsMCwwLjUtMC4yLDAuNi0wLjRsMS0zLjJsMTMuOC00NS41CgkJYzAuMi0wLjcsMS4yLTAuNSwxLjIsMC4ydjg3LjdjMCwwLjMsMC4zLDAuNiwwLjYsMC42aDE2LjdjMC4zLDAsMC42LTAuMywwLjYtMC42VjE4Mi43YzAtMC4zLTAuMy0wLjYtMC42LTAuNkg1NTEuNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDIwLjksMTgyLjFjLTAuMywwLTAuNSwwLjItMC42LDAuNGwtMTMuNyw0NS4yYy0wLjIsMC42LTEsMC42LTEuMiwwbC0xMy43LTQ1LjJjLTAuMS0wLjMtMC4zLTAuNC0wLjYtMC40CgkJaC0yNS40Yy0wLjMsMC0wLjYsMC4zLTAuNiwwLjZ2MTE1LjRjMCwwLjMsMC4zLDAuNiwwLjYsMC42aDE2LjdjMC4zLDAsMC42LTAuMywwLjYtMC42di04Ny43YzAtMC43LDEtMC44LDEuMi0wLjJsMTMuOCw0NS41bDEsMy4yCgkJYzAuMSwwLjMsMC4zLDAuNCwwLjYsMC40aDEyLjhjMC4zLDAsMC41LTAuMiwwLjYtMC40bDEtMy4ybDEzLjgtNDUuNWMwLjItMC43LDEuMi0wLjUsMS4yLDAuMnY4Ny43YzAsMC4zLDAuMywwLjYsMC42LDAuNmgxNi43CgkJYzAuMywwLDAuNi0wLjMsMC42LTAuNlYxODIuN2MwLTAuMy0wLjMtMC42LTAuNi0wLjZIMTAyMC45eiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTgwNS41LDE4Mi4xaC0zMS4xaC0xNi43aC0zMS4xYy0wLjMsMC0wLjYsMC4zLTAuNiwwLjZ2MTQuNGMwLDAuMywwLjMsMC42LDAuNiwwLjZoMzAuNXYxMDAuNAoJCWMwLDAuMywwLjMsMC42LDAuNiwwLjZoMTYuN2MwLjMsMCwwLjYtMC4zLDAuNi0wLjZWMTk3LjdoMzAuNWMwLjMsMCwwLjYtMC4zLDAuNi0wLjZ2LTE0LjRDODA2LjEsMTgyLjQsODA1LjksMTgyLjEsODA1LjUsMTgyLjF6IgoJCS8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTA0LDI5OC43aDE1LjJjMC40LDAsMC43LTAuNCwwLjYtMC44bC0zMS40LTExNS44Yy0wLjEtMC4zLTAuMy0wLjQtMC42LTAuNEg4ODJoLTEwLjJIODY2CgkJYy0wLjMsMC0wLjUsMC4yLTAuNiwwLjRsLTMxLjQsMTE1LjhjLTAuMSwwLjQsMC4yLDAuOCwwLjYsMC44aDE1LjJjMC4zLDAsMC41LTAuMiwwLjYtMC40bDkuMS0zMy43YzAuMS0wLjMsMC4zLTAuNCwwLjYtMC40aDMzLjYKCQljMC4zLDAsMC41LDAuMiwwLjYsMC40bDkuMSwzMy43QzkwMy41LDI5OC41LDkwMy44LDI5OC43LDkwNCwyOTguN3ogTTg2NC4xLDI0Ny43bDEyLjItNDUuMWMwLjItMC42LDEtMC42LDEuMiwwbDEyLjIsNDUuMQoJCWMwLjEsMC40LTAuMiwwLjgtMC42LDAuOGgtMjQuNEM4NjQuMywyNDguNSw4NjQsMjQ4LjEsODY0LjEsMjQ3Ljd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTE2My4yLDI5OC43aDE1LjJjMC40LDAsMC43LTAuNCwwLjYtMC44bC0zMS40LTExNS44Yy0wLjEtMC4zLTAuMy0wLjQtMC42LTAuNGgtNS44SDExMzFoLTUuOAoJCWMtMC4zLDAtMC41LDAuMi0wLjYsMC40bC0zMS40LDExNS44Yy0wLjEsMC40LDAuMiwwLjgsMC42LDAuOGgxNS4yYzAuMywwLDAuNS0wLjIsMC42LTAuNGw5LjEtMzMuN2MwLjEtMC4zLDAuMy0wLjQsMC42LTAuNGgzMy42CgkJYzAuMywwLDAuNSwwLjIsMC42LDAuNGw5LjEsMzMuN0MxMTYyLjcsMjk4LjUsMTE2Mi45LDI5OC43LDExNjMuMiwyOTguN3ogTTExMjMuMywyNDcuN2wxMi4yLTQ1LjFjMC4yLTAuNiwxLTAuNiwxLjIsMGwxMi4yLDQ1LjEKCQljMC4xLDAuNC0wLjIsMC44LTAuNiwwLjhoLTI0LjRDMTEyMy41LDI0OC41LDExMjMuMiwyNDguMSwxMTIzLjMsMjQ3Ljd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjI5LjcsMjgxLjZ2LTM1LjhjMC0wLjMsMC4zLTAuNiwwLjYtMC42aDQ0LjVjMC4zLDAsMC42LTAuMywwLjYtMC42di0xNC40YzAtMC4zLTAuMy0wLjYtMC42LTAuNmgtNDQuNQoJCWMtMC4zLDAtMC42LTAuMy0wLjYtMC42di0zMC42YzAtMC4zLDAuMy0wLjYsMC42LTAuNmg1MC42YzAuMywwLDAuNi0wLjMsMC42LTAuNnYtMTQuNGMwLTAuMy0wLjMtMC42LTAuNi0wLjZoLTUxLjJoLTE3LjMKCQljLTAuMywwLTAuNiwwLjMtMC42LDAuNnYxNXYzMS45djE1LjZ2Mzd2MTUuOGMwLDAuMywwLjMsMC42LDAuNiwwLjZoMTcuM0g2ODNjMC4zLDAsMC42LTAuMywwLjYtMC42di0xNS4yYzAtMC4zLTAuMy0wLjYtMC42LTAuNgoJCWgtNTIuOEM2MjkuOSwyODIuMiw2MjkuNywyODIsNjI5LjcsMjgxLjZ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQyOS4yLDI5Ny43bC01Ny44LTU5LjdjLTAuMi0wLjItMC4yLTAuNiwwLTAuOGw1Mi01NGMwLjQtMC40LDAuMS0xLTAuNC0xaC0yMS4zYy0wLjIsMC0wLjMsMC4xLTAuNCwwLjIKCQlsLTQ0LjEsNDUuOGMtMC40LDAuNC0xLDAuMS0xLTAuNHYtNDVjMC0wLjMtMC4zLTAuNi0wLjYtMC42aC0xNi43Yy0wLjMsMC0wLjYsMC4zLTAuNiwwLjZ2MTE1LjRjMCwwLjMsMC4zLDAuNiwwLjYsMC42aDE2LjcKCQljMC4zLDAsMC42LTAuMywwLjYtMC42di01MC44YzAtMC41LDAuNy0wLjgsMS0wLjRsNTAsNTEuNmMwLjEsMC4xLDAuMywwLjIsMC40LDAuMmgyMS4zQzE0MjkuMywyOTguNywxNDI5LjYsMjk4LDE0MjkuMiwyOTcuN3oiLz4KPC9nPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMzY2LDEyMCAyNjQuOSwxOTUgMjgzLjcsMTUwLjggCSIvPgoJPGc+CgkJPHBvbHlnb24gY2xhc3M9InN0MiIgcG9pbnRzPSIxMzIuOCwxMjAgMjMzLDE5NS43IDIxNS4xLDE1MC44IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MiIgcG9pbnRzPSIzMjkuNiwyOTMuOSAzMDIuNywzMzUuMSAzNjAuMywzNTEgMzc2LjgsMjk0LjggCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjEyMi4xLDI5NC44IDEzOC41LDM1MSAxOTYsMzM1LjEgMTY5LjIsMjkzLjkgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjE5Mi45LDIyNC4zIDE3Ni45LDI0OC41IDIzMy45LDI1MS4xIDIzMiwxODkuNiAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMzA1LjksMjI0LjMgMjY2LjIsMTg4LjkgMjY0LjksMjUxLjEgMzIxLjksMjQ4LjUgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjE5NiwzMzUuMSAyMzAuNSwzMTguNCAyMDAuOCwyOTUuMiAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMjY4LjMsMzE4LjQgMzAyLjcsMzM1LjEgMjk4LDI5NS4yIAkJIi8+Cgk8L2c+Cgk8Zz4KCQk8cG9seWdvbiBjbGFzcz0ic3QzIiBwb2ludHM9IjMwMi43LDMzNS4xIDI2OC4zLDMxOC40IDI3MS4xLDM0MC44IDI3MC44LDM1MC4zIAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MyIgcG9pbnRzPSIxOTYsMzM1LjEgMjI4LDM1MC4zIDIyNy44LDM0MC44IDIzMC41LDMxOC40IAkJIi8+Cgk8L2c+Cgk8cG9seWdvbiBjbGFzcz0ic3Q0IiBwb2ludHM9IjIyOC42LDI4MC40IDIwMCwyNzIgMjIwLjIsMjYyLjcgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIyNzAuMiwyODAuNCAyNzguNiwyNjIuNyAyOTguOSwyNzIgCSIvPgoJPGc+CgkJPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIxOTYsMzM1LjEgMjAxLDI5My45IDE2OS4yLDI5NC44IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIyOTcuOCwyOTMuOSAzMDIuNywzMzUuMSAzMjkuNiwyOTQuOCAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDUiIHBvaW50cz0iMzIxLjksMjQ4LjUgMjY0LjksMjUxLjEgMjcwLjIsMjgwLjQgMjc4LjYsMjYyLjcgMjk4LjksMjcyIAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIyMDAsMjcyIDIyMC4yLDI2Mi43IDIyOC42LDI4MC40IDIzMy45LDI1MS4xIDE3Ni45LDI0OC41IAkJIi8+Cgk8L2c+Cgk8Zz4KCQk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjE3Ni45LDI0OC41IDIwMC44LDI5NS4yIDIwMCwyNzIgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjI5OC45LDI3MiAyOTgsMjk1LjIgMzIxLjksMjQ4LjUgCQkiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjIzMy45LDI1MS4xIDIyOC42LDI4MC40IDIzNS4zLDMxNSAyMzYuOCwyNjkuNCAJCSIvPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDYiIHBvaW50cz0iMjY0LjksMjUxLjEgMjYyLjEsMjY5LjMgMjYzLjUsMzE1IDI3MC4yLDI4MC40IAkJIi8+Cgk8L2c+Cgk8cG9seWdvbiBjbGFzcz0ic3Q3IiBwb2ludHM9IjI3MC4yLDI4MC40IDI2My41LDMxNSAyNjguMywzMTguNCAyOTgsMjk1LjIgMjk4LjksMjcyIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDciIHBvaW50cz0iMjAwLDI3MiAyMDAuOCwyOTUuMiAyMzAuNSwzMTguNCAyMzUuMywzMTUgMjI4LjYsMjgwLjQgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0OCIgcG9pbnRzPSIyNzAuOCwzNTAuMyAyNzEuMSwzNDAuOCAyNjguNSwzMzguNiAyMzAuMywzMzguNiAyMjcuOCwzNDAuOCAyMjgsMzUwLjMgMTk2LDMzNS4xIDIwNy4yLDM0NC4zIAoJCTIyOS45LDM2MCAyNjguOCwzNjAgMjkxLjYsMzQ0LjMgMzAyLjcsMzM1LjEgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0OSIgcG9pbnRzPSIyNjguMywzMTguNCAyNjMuNSwzMTUgMjM1LjMsMzE1IDIzMC41LDMxOC40IDIyNy44LDM0MC44IDIzMC4zLDMzOC42IDI2OC41LDMzOC42IDI3MS4xLDM0MC44IAkiLz4KCTxnPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDEwIiBwb2ludHM9IjM3MC4zLDE5OS45IDM3OC44LDE1OC41IDM2NiwxMjAgMjY4LjMsMTkyLjUgMzA1LjksMjI0LjMgMzU5LDIzOS44IDM3MC43LDIyNi4xIDM2NS42LDIyMi40IAoJCQkzNzMuNywyMTUgMzY3LjUsMjEwLjIgMzc1LjYsMjA0IAkJIi8+CgkJPHBvbHlnb24gY2xhc3M9InN0MTAiIHBvaW50cz0iMTIwLDE1OC41IDEyOC42LDE5OS45IDEyMy4xLDIwNCAxMzEuMywyMTAuMiAxMjUuMSwyMTUgMTMzLjIsMjIyLjQgMTI4LjEsMjI2LjEgMTM5LjgsMjM5LjggCgkJCTE5Mi45LDIyNC4zIDIzMC41LDE5Mi41IDEzMi44LDEyMCAJCSIvPgoJPC9nPgoJPHBvbHlnb24gY2xhc3M9InN0NyIgcG9pbnRzPSIzNTksMjM5LjggMzA1LjksMjI0LjMgMzIxLjksMjQ4LjUgMjk4LDI5NS4yIDMyOS42LDI5NC44IDM3Ni44LDI5NC44IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDciIHBvaW50cz0iMTkyLjksMjI0LjMgMTM5LjgsMjM5LjggMTIyLjEsMjk0LjggMTY5LjIsMjk0LjggMjAwLjgsMjk1LjIgMTc2LjksMjQ4LjUgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0NyIgcG9pbnRzPSIyNjQuOSwyNTEuMSAyNjguMywxOTIuNSAyODMuNywxNTAuOCAyMTUuMSwxNTAuOCAyMzAuNSwxOTIuNSAyMzMuOSwyNTEuMSAyMzUuMiwyNjkuNSAyMzUuMywzMTUgCgkJMjYzLjUsMzE1IDI2My42LDI2OS41IAkiLz4KPC9nPgo8L3N2Zz4K";

/* babel-plugin-inline-import './utils/coinbase.png' */
const coinbase = "data:image/png;base64,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";
const START_SIGN = 0;
const CONNECT_WALLET = 1;
const SIGN_MESSAGE = 2;
const VERIFY = 3;
const VERIFY_TWEET = 4;
const VERIFYING = 5;
const FINISH_SIGN = 6;

const CloseButton = ({
  handleClose
}) => {
  return /*#__PURE__*/React.createElement(IconButton, {
    onClick: handleClose,
    sx: {
      position: 'absolute',
      right: 15,
      top: 15,
      background: 'rgba(196, 196, 196, 0.2)',
      height: 48,
      width: 48,
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement(CloseIcon, null));
};

const StartSign = ({
  name,
  handle,
  alert,
  setName,
  setHandle,
  handleFormSubmit,
  buttonStyle,
  modalStyle
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Leave your ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy"), "."), /*#__PURE__*/React.createElement(TextField, {
    label: "name",
    variant: "outlined",
    value: name,
    required: true,
    onInput: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "twitter handle",
    variant: "outlined",
    value: handle,
    onInput: e => setHandle(e.target.value)
  }), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert), /*#__PURE__*/React.createElement(Button, {
    onClick: handleFormSubmit,
    variant: "contained",
    size: "large",
    sx: buttonStyle || styles.button
  }, "Connect wallet to sign"));
};

const ConnectWallet = ({
  alert,
  handleConnect
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Connect your ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "wallet"), "."), /*#__PURE__*/React.createElement(Box, {
    onClick: () => handleConnect('coinbase'),
    sx: {
      cursor: 'pointer',
      borderBottom: '1px solid #eee',
      textAlign: 'center',
      py: 2,
      ':hover': {
        opacity: 0.8
      }
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: coinbase,
    style: {
      height: 50,
      width: 300
    },
    alt: "login with Coinbase Wallet!"
  })), /*#__PURE__*/React.createElement(Box, {
    onClick: () => handleConnect('metamask'),
    sx: {
      cursor: 'pointer',
      textAlign: 'center',
      ':hover': {
        opacity: 0.8
      }
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: metamask,
    style: {
      height: 100,
      width: 300
    },
    alt: "login with Metamask!"
  })), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert));
};

const SignMessage = ({
  alert,
  handleSign,
  buttonStyle
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Sign a ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "message"), " with your wallet."), /*#__PURE__*/React.createElement(Button, {
    onClick: handleSign,
    variant: "contained",
    size: "large",
    sx: buttonStyle || styles.button
  }, "Sign message"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert));
};

const Verify = ({
  alert,
  handleTweet,
  handleWithoutVerifying,
  buttonStyle
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Verify your ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "signature"), "."), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 18
    }
  }, "Tweet a message to prove that you control this address. Return here afterwards to complete verification."), /*#__PURE__*/React.createElement(Button, {
    onClick: handleTweet,
    startIcon: /*#__PURE__*/React.createElement(TwitterIcon, null),
    variant: "contained",
    sx: buttonStyle || styles.button
  }, "Post Proof"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center'
    },
    onClick: handleWithoutVerifying
  }, /*#__PURE__*/React.createElement("a", null, "Continue without verifying")));
};

const Verifying = () => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Verifying"), /*#__PURE__*/React.createElement(CircularProgress, {
    size: "large"
  }));
};

const VerifyTweet = ({
  alert,
  handleTwitterVerifyAndSign,
  buttonStyle
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Complete ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "verification"), "."), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 18
    }
  }, "After sending your tweet, click the button below to complete verification:"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleTwitterVerifyAndSign,
    startIcon: /*#__PURE__*/React.createElement(TwitterIcon, null),
    variant: "contained",
    sx: buttonStyle || styles.button
  }, "Verify Tweet"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert));
};

const FinishSign = () => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "YOU"), " did it!"), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20
    }
  }, "Thanks for signing and building your ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy"), "."));
};

export default function SignModal(props) {
  const {
    projectId,
    isModalVisible,
    handleClose,
    handleLoginClick,
    signFromWallet,
    account,
    active,
    buttonStyle,
    modalStyle
  } = props;
  const [state, setState] = useState(START_SIGN);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [alert, setAlert] = useState();
  const [signature, setSignature] = useState(false);

  const handleFormSubmit = () => {
    if (name) {
      setAlert('');
      setState(CONNECT_WALLET);
    } else {
      setAlert('Name is required.');
    }
  }; // connects to wallet


  const handleConnect = provider => {
    handleLoginClick(provider).then(res => {
      setAlert('');
      setState(SIGN_MESSAGE);
    }).catch(err => {
      setAlert('An error occured. Please try connecting your wallet again.');
    });
  };

  const handleSign = async () => {
    if (!active) {
      setAlert('Please connect your wallet first.');
      setState(CONNECT_WALLET);
      return;
    }

    signFromWallet(account, name, handle).then(sig => {
      setSignature(sig);
      setAlert('');
      setState(VERIFY);
    }).catch(err => {
      setAlert('An error occurred. Please try signing again.');
    });
  };

  const generateTweet = () => {
    const str = `I'm building my digital legacy today. Verifying for @legacy_xyz signature:${signature}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURI(str)}`);
  };

  const handleTweet = () => {
    generateTweet();
    setState(VERIFY_TWEET);
  };

  const handleTwitterVerifyAndSign = () => {
    setState(VERIFYING);
    verify(signature, handle).then(() => {
      // verifying that they signed
      sign(projectId, name, account, handle, signature).then(result => {
        setAlert('');
        setState(FINISH_SIGN);
      }).catch(err => {
        setAlert("An error occurred with signing to the blockchain.");
        setState(VERIFY_TWEET);
      });
    }).catch(err => {
      setAlert("An error occurred. Did you tweet a message?");
      setState(VERIFY);
    });
  };

  const handleWithoutVerifying = () => {
    setState(VERIFYING);
    sign(projectId, name, account, handle, signature).then(result => {
      setAlert('');
      setState(FINISH_SIGN);
    }).catch(err => {
      setAlert("An error occurred with signing to the blockchain.");
      setState(VERIFY);
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    open: isModalVisible,
    onClose: handleClose,
    onBackdropClick: handleClose
  }, /*#__PURE__*/React.createElement(Box, {
    sx: modalStyle || {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 445,
      background: 'white',
      border: '0px',
      borderRadius: 10,
      boxShadow: 24,
      marginLeft: 'auto',
      marginRight: 'auto',
      p: 5
    }
  }, /*#__PURE__*/React.createElement(CloseButton, {
    handleClose: handleClose
  }), /*#__PURE__*/React.createElement(Stack, {
    sx: {
      pt: 2
    }
  }, state === START_SIGN && /*#__PURE__*/React.createElement(StartSign, {
    name: name,
    handle: handle,
    alert: alert,
    setName: setName,
    setHandle: setHandle,
    handleFormSubmit: handleFormSubmit,
    buttonStyle: buttonStyle
  }), state === CONNECT_WALLET && /*#__PURE__*/React.createElement(ConnectWallet, {
    alert: alert,
    handleConnect: handleConnect
  }), state === SIGN_MESSAGE && /*#__PURE__*/React.createElement(SignMessage, {
    alert: alert,
    handleSign: handleSign,
    buttonStyle: buttonStyle
  }), state === VERIFY && /*#__PURE__*/React.createElement(Verify, {
    alert: alert,
    handleTweet: handleTweet,
    handleWithoutVerifying: handleWithoutVerifying,
    buttonStyle: buttonStyle
  }), state === VERIFY_TWEET && /*#__PURE__*/React.createElement(VerifyTweet, {
    alert: alert,
    handleTwitterVerifyAndSign: handleTwitterVerifyAndSign,
    buttonStyle: buttonStyle
  }), state === VERIFYING && /*#__PURE__*/React.createElement(Verifying, null), state === FINISH_SIGN && /*#__PURE__*/React.createElement(FinishSign, null), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center',
      mt: 3
    }
  }, "\uD83C\uDF31 Check out ", /*#__PURE__*/React.createElement("a", {
    href: "https://legacy-xyz.vercel.app/",
    target: "_blank",
    style: {
      textDecoration: 'none'
    },
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy")), " to learn more")))));
}
const styles = {
  button: {
    background: '#000000',
    textTransform: 'none',
    fontSize: 20,
    borderRadius: 3,
    ':hover': {
      background: '#000000',
      opacity: 0.8
    }
  }
};