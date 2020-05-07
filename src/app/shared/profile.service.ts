import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Staff } from '../models/account';

@Injectable({
  providedIn: 'root'
})

export class PortalService { 
StaffProfile : Staff;

constructor(private fb : FormBuilder) {  }


staffProfile = this.fb.group({
    UserId : [],
    Email : [], 
    FristName : ['', Validators.required],
    SurName : ['', Validators.required],
    MiddleName : ['' ],
    DateOfBirth : ['', Validators.required],
    PlaceOfBirth : ['', Validators.required],
    Sex : ['', Validators.required],  
    MobilePhone : ['', [Validators.required, Validators.minLength(11)]],
    // LocationDetail : this.fb.group({ 
    //     Nationality : ['' ], 
    //     State : ['' ], 
    //     City : ['' ], 
    //     LGA : ['' ], 
    //     NearestBustop : ['' ], 
    //     FatherName : ['' ], 
    //     MotherName : ['' ], 
    //     FatherPhone : ['' ], 
    //     MotherPhone : ['' ],  
    // }),
    // OtherDetail : this.fb.group({ 
    //     DateHired : ['' ], 
    //     YearsOfService : ['' ], 
    //     Carnet : ['' ],
    //     Observations : ['' ], 
    //     Specialty : ['' ], 
    //     Salary : ['' ], 
    // })
});

}