import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { WeatherAPIService } from "../../../_service/weather-api.service";
import { checkCityNameValidator } from "../../../_shared/checkCityName.validator";
import { UserService } from "../../../_service/user.service";
import { DatabaseService } from "../../../_service/database.service";
import { UserdataModel } from "../../../_model/userdata.model";

@Component({
  selector: "app-save-city-form",
  templateUrl: "./save-city-form.component.html",
  styleUrls: ["./save-city-form.component.scss"],
})
export class SaveCityFormComponent implements OnInit {
  searchCityForm!: FormGroup;
  @ViewChild("inputCityField") inputCityField!: any;
  constructor(
    private formBuilder: FormBuilder,
    private api: WeatherAPIService,
    private cityValidation: checkCityNameValidator,
    private user: UserService,
    private database: DatabaseService
  ) {}

  ngOnInit() {
    this.setFormGroup();
  }

  setFormGroup() {
    this.searchCityForm = this.formBuilder.group({
      cityname: this.formBuilder.control(
        null,
        (Validators.minLength(3), Validators.required),
        this.cityValidation.validate
      ),
    });
  }

  saveNewCity(): void {
    const inputValue: any = this.searchCityForm.controls["cityname"].value;
    if (this.checkIfDoubleCity(inputValue)) {
    }
    this.inputCityField.nativeElement.blur();
    this.user.User.savedcities.push(inputValue);
    this.database
      .updateSavedCities({ savedcities: this.user.User.savedcities })
      .subscribe((result) => {
        console.log(result);
      });
    this.searchCityForm.reset();
  }

  checkIfDoubleCity(newCity: string) {
    return this.user.User.savedcities.includes(newCity);
  }
}
