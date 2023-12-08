1. How to Run the project

command:- ng serve --host 0 --port 4200

description:- port number we can adjust as per our need


2. How to Build

environment.ts

apiHost = ''; 

production = false 


environment.prod.ts

apiHost:'https://bemsasn.cdacchn.in',

production:true


make shour the above file to be like this then use the below command to build the project

command:- ng build --configuration production --aot --output-hashing=all

description:- IT will create a 'build' folder containing the ISOC project. Within this folder, we'll compress the ISOC project and provide it to the backend for integration.
