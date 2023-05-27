# Hospital-API
An Hospital API using MongoDB and NodeJS

## Tasks :
* ### Theme :
  - We’re going to design an API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients
  - There can be 2 types of Users
    - Doctors
    - Patients
  - Doctors can log in
  - Each time a patient visits, the doctor will follow 2 steps
    - Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
    - After the checkup, create a Report
  - Patient Report will have the following fields
    - Created by doctor
    - Status (You can use enums if you want to):
      - Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine,Positive-Admit]
    - Date

* ### Route access
  - All routes are accessible via /api/v1 then the required routes

* ### Required Routes :
  - /doctors/register → Register a new doctor
  - /doctors/login → Login Doctor (returns JWT)
  - /patients/register → Register new patient with phone no
  - /patients/:id/create_report → Create report of a patient
  - /patients/:id/all_reports → List all the reports of a patient oldest to latest
  - /reports/:status → List all the reports of all the patients filtered by a specific status

* ### Data that needs to be sent with a route :
  - /doctors/register → username and password (POST with Form-Body)
  - /doctors/login → username and password (POST with Form-Body)
  - /patients/register → JWT Token (Header Authentication), name, age, phone (POST with Form-Body)
  - /patients/:id/create_report → JWT Token (Header Authentication), patient id (in params), status ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"] (POST with Form-Body)
  - /patients/:id/all_reports → JWT Token (Header Authentication), patient id (in params) (GET request)
  - /reports/:status → JWT Token (Header Authentication), status (in params) (GET request)

## Built With
Technology Stack to build this Application
* MongoDB
* Express
* NodeJS
* jsonwebtoken (for authentication)

## Getting Started
   * Clone this project
   * Start by installing npm and mongoDB if you don't have them already.
   * Run the Mongo Server.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/tridevVerma/Hospital-API.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   
 ## Directory Structure and flow of The Code

    Hospital-API
        |------ config
        |         └--- mongoose.js
        |         └--- environment.js
        |         └--- verifyUser.js
        |------ controller
        |         └--- api
        |               └--- v1 
        |                     └--- doctorController.js
        |                     └--- patientController.js
        |                     └--- reportsController.js
        |------ models
        |         └--- Doctor.js
        |         └--- Patient.js
        |         └--- Report.js
        |------ routes
        |         └--- api
        |               └--- v1 
        |                     └--- doctors.js
        |                     └--- patients.js
        |                     └--- reports.js
        |------ .gitignore
        |------ index.js
        |------ package.json
        |------ package-lock.json
        └------ README.md
