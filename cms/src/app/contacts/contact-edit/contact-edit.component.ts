import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', {static: true}) contactForm: NgForm;
  originalContact: Contact;
  contact: Contact;

  groupContacts: any[];
  editMode: boolean = false;
  id: string;
  subscription: Subscription;

  groups: Contact[];
  checkedGroups: any[] = [];
   
  constructor(
      private contactService: ContactService,
      private router: Router,
      private route: ActivatedRoute) {

        this.groups = this.contactService.getGroups();
      }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params)=>{
        this.id = params['id'];
        if(!this.id){
          if(+this.id === 0){

          }else{
            this.editMode = false;
            return;
          }
        
        }
        this.originalContact = this.contactService.getContact(+this.id);

        if(!this.originalContact){
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        for(let x = 0; x < this.groups.length; x++){

          let contactFound = false;
          for(let z = 0; z < this.groups[x].group!.length; z++){
            if(this.groups[x].group![z].id == this.contact.id){
              console.log("in group if - true");
              this.checkedGroups[x] = true;
              contactFound = true;
            }
          }
          if(!contactFound){
            this.checkedGroups[x] = false;
            console.log("in group if - false");
          }
          
        }

        this.onGroupChange();

        if(!this.originalContact.group){
          
        }else{
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          
        }
        
        setTimeout(() => {
          // this.contactForm.setValue({
          //   name: this.contact.name,
          //   email: this.contact.email,
          //   phone: this.contact.phone,
          //   imageUrl: this.contact.imageUrl,
          
          // });

          this.contactForm.controls["name"].setValue(this.contact.name);
          this.contactForm.controls["email"].setValue(this.contact.email);
          this.contactForm.controls["phone"].setValue(this.contact.phone);
          this.contactForm.controls["imageUrl"].setValue(this.contact.imageUrl);

          if(!(!this.checkedGroups)){
            for(let x = 0; x < this.groups.length; x++){
              let key = this.groups[x].id;
              let value = this.checkedGroups[x];
              console.log(value);
              this.contactForm.controls[`${key}`].setValue(value);
             
            }
          }
          
          
        }, ); 
      }
    );

    
    
    console.log(this.groups);
    

  }
    

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    let value = form.value;

    console.log(value);


    
    this.contact = new Contact('', value.name, value.email, value.phone, value.imageUrl, null);

    if(this.editMode){
      this.contactService.updatecontact(this.originalContact, this.contact);
    }else{
      this.contactService.addcontact(this.contact);
    }

    if(!(!this.groupContacts)){
      this.contactService.manageGroups(this.groupContacts, this.contact);
    }
    

    this.router.navigate(['/contacts']); 
    
  }

  updateGroups(){
     console.log(this.contactForm.value.groupContacts);
  }

  onRemoveGroupItem(i: number){
    console.log(i);

    this.checkedGroups[i] = false;
    this.onGroupChange();
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onGroupChange(){
    this.groupContacts = [];
    for (let i = 0; i < this.checkedGroups.length; i++){
      let includeGroup = this.checkedGroups[i];
      if(includeGroup){
        
        this.groupContacts.push([i ,this.groups[i]]);
      }
    }
  }

}
