# Pet Store Inventory Application
#### Scroll to the bottom for steps on running the application locally

**Process of creating this project**
Creating ERD following requirements: 
* As a user, I need to be able to view a list of all the pets that are in stock and review inventory.
* As a user, I should be able to filter the list of animals by their type, weight, and color(s).
* Each pet has a single type, name, and weight.
* Each pet needs to be associated with multiple colors.
* Examples of a type are dog, cat, hamster, bird.
* As a user, I need to be able to track the date each pet was sold and the price paid.

For extra credit, I also added an attributes table, that lists one or many attributes about the animal. Some attributes may apply to multiple pet types and the attribute will not necessarily be the same for all animals with the same pet type.
![image](https://github.com/user-attachments/assets/982c1085-09f5-406a-b86d-434c4bd35f64)

After which I created more user stories to understand the structure of the application a little more in terms of scalability and design:
* As a user, I need to be able to see a display of animals with all their attributes
* As a user, I should to be able to filter between real animals and toys.
* As a user, I need to be able to view the application on my phone
* As a user, I should to be able to able to view the data in different formats
* As a user, I need to be able to search through the attributes of a pet.

I did a quick sketch of how to visualize the data and application using mobile-first design:
![Untitled (Draft)-2](https://github.com/user-attachments/assets/4a17c1c6-6262-4ce9-b25d-aba4f5642d33)

I then worked on Figma to figure out the colors I liked for the application and design of certain elements such as buttons/cards:
![Frame 1](https://github.com/user-attachments/assets/7e272e8c-ad25-4dfa-9ac8-36cc50ee949a)


**Steps to run Pet Store Inventory**
1. Clone repo
2. Open terminal and enter the command below or redirect to the backend folder:
```cd backend```
3. Run
```node index.js```
This should run the backend of the application on PORT 4000. To check, go to localhost:4000/pets and you should see the JSON values returned

5. Open another terminal, and redirect to the frontend:
```cd frontend```
6. Run the following command to install any node packages:
```npm i```
7. Then run the command below to start running the application:
```npm start```
You should be able to view the UI when you go to PORT 3000 (localhost:3000), or the available port the application runs on when you run "npm start".
