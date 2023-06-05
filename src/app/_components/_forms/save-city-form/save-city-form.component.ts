import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { WeatherAPIService } from "../../../_service/weather-api.service";
import { checkCityNameValidator } from "../../../_shared/checkCityName.validator";
import { UserService } from "../../../_service/user.service";
import { DatabaseService } from "../../../_service/database.service";

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
    this.api.autoCompleteAPI(inputValue).subscribe((result) => {
      const resCity = result[0].name.split(" ")[0];
      if (!this.checkIfDoubleCity(resCity)) {
        this.pushNewCity(resCity);
        this.addToDatabase();
        this.inputCityField.nativeElement.blur();
      }
    });
    this.searchCityForm.reset();
  }

  pushNewCity(newCity: string) {
    this.user.User.savedcities.push(newCity);
  }

  addToDatabase() {
    this.database
      .updateSavedCities({ savedcities: this.user.User.savedcities })
      .subscribe((result) => {
        // console.log(result);
      });
  }

  checkIfDoubleCity(newCity: string) {
    return this.user.User.savedcities.includes(newCity);
  }
}
