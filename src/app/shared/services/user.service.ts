import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class UserService{
    user:any[]= [
        
        {name:'Subodh Kumar', username:'sk', email:'sksingh@delphime.com', password:'12345', }
        ,{name:'Narendra Patel', username:'sk', email:'npatel@delphime.com', password:'12345', },
        {name:'Shanmukha Anjaneyulu Nidamanuru', username:'sa', email:'snidamanuru@delphime.com', password:'12345', },
        {name:'Abhilash Augustine', username:'aa', email:'aaugustine@delphime.com', password:'12345', },
    ]
}