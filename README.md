# Student Enrollment Form using JsonPowerDB

A web-based **Student Enrollment Form** built using HTML, Bootstrap, JavaScript, jQuery, and **JsonPowerDB (JPDB)**. The application allows users to create and update student enrollment records using a simple form connected directly to JsonPowerDB.

## Table of Contents

- [Description](#description)
- [Project Details](#project-details)
- [Benefits of Using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Scope of Functionalities](#scope-of-functionalities)
- [How the Application Works](#how-the-application-works)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage Example](#usage-example)
- [Illustrations](#illustrations)
- [Release History](#release-history)
- [Project Status](#project-status)
- [Sources](#sources)
- [Author](#author)

## Description

The **Student Enrollment Form** is a micro project developed as part of the JsonPowerDB learning exercise. It demonstrates how a frontend web application can communicate with JsonPowerDB using its REST APIs.

The form stores student information in the `STUDENT-TABLE` relation of the `SCHOOL-DB` database. `Roll-No` is used as the primary key. When a user enters a Roll Number, the application first checks whether that student already exists. A new Roll Number enables the **Save** operation, while an existing Roll Number loads the stored information and enables the **Update** operation.

The application also validates the form to prevent empty values from being saved.

## Project Details

| Property | Value |
| --- | --- |
| Project | Student Enrollment Form |
| Database | `SCHOOL-DB` |
| Relation | `STUDENT-TABLE` |
| Primary Key | `Roll-No` |
| Frontend | HTML, Bootstrap, JavaScript, jQuery |

### Data Fields

The following information is stored for each student:

- Roll No
- Full Name
- Class
- Birth Date
- Address
- Enrollment Date

## Benefits of Using JsonPowerDB

JsonPowerDB is useful for this project because it provides a simple REST-based approach for storing and retrieving JSON data.

Some important benefits are:

- **Simple to use:** Data can be stored and retrieved using REST API requests.
- **Schema-free:** JSON data can be stored without defining a complex fixed schema beforehand.
- **Fast development:** Frontend applications can interact with JPDB with relatively little code.
- **Multiple database operations:** Supports operations for inserting, reading, updating, and removing records.
- **JSON-based:** Data is exchanged in JSON format, which works naturally with JavaScript.
- **Serverless development support:** Small applications can communicate with the database through APIs without building a separate application server for basic database operations.
- **Easy integration:** Can be integrated with HTML, JavaScript, jQuery, Bootstrap, and other web technologies.

## Scope of Functionalities

The project implements the required student enrollment workflow:

1. On page load, the form is reset automatically.
2. The cursor is placed in the **Roll No** field.
3. All other input fields are initially disabled.
4. Save, Update, and Reset buttons are initially disabled.
5. The entered Roll No is checked against JsonPowerDB.
6. If the Roll No does **not exist**:
   - Remaining fields are enabled.
   - **Save** and **Reset** buttons are enabled.
   - Cursor moves to **Full Name**.
7. If the Roll No **already exists**:
   - Existing student information is displayed.
   - Roll No is disabled to protect the primary key.
   - **Update** and **Reset** buttons are enabled.
   - Cursor moves to **Full Name**.
8. All fields are validated before saving or updating.
9. **Save** inserts a new student record.
10. **Update** modifies the existing student record.
11. **Reset** returns the application to its initial state.

## How the Application Works

```text
Page Load
    |
    v
Enter Roll No
    |
    v
Check Roll No in JsonPowerDB
    |
    +-------------------------+
    |                         |
    v                         v
Roll No not found        Roll No found
    |                         |
    v                         v
Enable form fields       Load existing data
Enable Save + Reset      Enable Update + Reset
    |                         |
    v                         v
Enter student data       Modify student data
    |                         |
    v                         v
Save                    Update
    |                         |
    +-----------+-------------+
                |
                v
            Reset Form
```

## Technologies Used

- **HTML5** — page structure and form
- **CSS3** — additional styling
- **Bootstrap 3** — responsive UI components
- **JavaScript** — application logic
- **jQuery** — DOM handling and API-related interaction
- **JsonPowerDB** — database
- **JPDB Commons JavaScript library** — helper functions for JsonPowerDB requests

## Project Structure

```text
Student_Enrollment_JPDB/
|
|-- index.html
|-- index.js
|-- README.md
`-- screenshots/
```

`index.html` contains the user interface and loads Bootstrap, jQuery, and the JsonPowerDB commons library.

`index.js` contains validation, primary-key lookup, Save, Update, Reset, and JsonPowerDB communication logic.

## Setup and Installation

### 1. Get the project

Clone your GitHub repository after you upload the project:

```sh
git clone YOUR_GITHUB_REPOSITORY_URL
cd Student_Enrollment_JPDB
```

Alternatively, download the project as a ZIP and extract it.

### 2. Configure JsonPowerDB

Open `index.js` and find:

```javascript
var connToken = "YOUR_CONNECTION_TOKEN";
```

Replace `YOUR_CONNECTION_TOKEN` with a valid JsonPowerDB connection token **only in your local copy**.

> **Security:** Do not commit a real connection token to a public GitHub repository.

### 3. Run the application

You can use VS Code Live Server or start a simple local web server:

```sh
python3 -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## Usage Example

### Saving a New Student

Enter a Roll No that does not already exist. After the application checks the database, complete the remaining fields.

Example:

```text
Roll No: 101
Full Name: Rahul Sharma
Class: 12-A
Birth Date: 2008-05-15
Address: Gurugram, Haryana
Enrollment Date: 2026-08-17
```

Click **Save**. The student record is stored in `SCHOOL-DB` → `STUDENT-TABLE`, and the form returns to its initial state.

### Updating an Existing Student

Enter an existing Roll No. The application retrieves the corresponding student record and fills the form automatically.

Modify any allowed field and click **Update**. The existing JsonPowerDB record is updated and the form is reset.

## Illustrations

### Initial Form — Only Roll No enabled

![Initial Form](screenshots/Screenshot%20From%202026-08-17%2011-34-05.png)

### New Student Entry — Save and Reset enabled

![New Student Entry](screenshots/Screenshot%20From%202026-08-17%2012-05-09.png)

### Existing Student Record — Update and Reset enabled

![Existing Student Update](screenshots/Screenshot%20From%202026-08-17%2014-13-07.png)

### JsonPowerDB Stored Records

![JsonPowerDB Records](screenshots/Screenshot%20From%202026-08-17%2013-02-44.png)

## Release History

### v1.0.0 — Initial Release

**17 August 2026**

- Created Student Enrollment Form UI.
- Integrated JsonPowerDB with the application.
- Added primary-key lookup using Roll No.
- Added new student record functionality.
- Added existing student update functionality.
- Added Reset functionality.
- Added validation to prevent empty fields.
- Added automatic button and input-field state management.
- Added Bootstrap-based responsive interface.
- Added project documentation for GitHub submission.

Future improvements may include delete functionality, improved notifications, additional validation, and a student-record listing interface.

## Project Status

**Version:** `1.0.0`

**Status:** Completed for micro-project submission.

The required Save, Update, Reset, validation, primary-key lookup, and JsonPowerDB integration functionality has been implemented.

## Sources

- JsonPowerDB documentation and learning material provided by Login2Xplore
- Bootstrap documentation
- jQuery documentation
- Login2Xplore JsonPowerDB course material

## Author

**Sahil Yadav**

GitHub: `https://github.com/NIRLAJ`

---

### Important Security Note

The connection token used to access JsonPowerDB should be treated as a credential. Keep your real token in your local development copy and avoid publishing it in screenshots, README files, or public GitHub source code.
