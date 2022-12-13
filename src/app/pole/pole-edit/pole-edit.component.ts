import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, Subscription } from "rxjs";
import { LOCALE } from "src/app/locale/constants/locale.constant";
import {
  Locale,
  LocaleConstant,
  LocaleConstantPage,
  LocaleConstantPagePoleEdit,
} from "src/app/locale/model/locale.model";
import { LocaleService } from "src/app/locale/service/locale.service";
import { Pole } from "../model/pole.model";
import { PoleService } from "../service/pole.service";

@Component({
  selector: "it-pole-edit",
  templateUrl: "./pole-edit.component.html",
  styleUrls: ["./pole-edit.component.scss"],
})
export class PoleEditComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor(
    private readonly service: PoleService,
    private readonly localeService: LocaleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  public loading: boolean = false;
  public loadingAddress: boolean = false;
  public form!: FormGroup;
  public locale!: LocaleConstantPagePoleEdit;
  public currencyMask = {
    prefix: "R$ ",
    decimalMarker: "," as "," | ".",
    thousandSeparator: ".",
  };

  private localeChange?: Subscription;
  private changeZip?: Subscription;

  ngOnInit(): void {
    this.getLocale();
    this.buildForm();

    this.activatedRoute.params.subscribe((param) => {
      this.getPole(param["id"]);
    });
  }

  ngOnDestroy(): void {
    this.changeZip?.unsubscribe();
    this.localeChange?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  public save(): void {
    const pole: Pole = this.form.value;
    Reflect.deleteProperty(pole, "address");

    alert(this.locale.message.savedSuccessfully);

    this.router.navigate(["/pole/list"]);
  }

  private getLocale(): void {
    const language: Locale = this.localeService.laguage;
    this.locale = LOCALE[language].pole.edit;

    this.localeChange = this.localeService.locale$.subscribe({
      next: (locale) => {
        this.locale = LOCALE[locale].pole.edit;

        const prefix: string = locale === "pt-BR" ? "R$ " : "$";
        const decimalMarker: "," | "." = locale === "pt-BR" ? "," : ".";
        const thousandSeparator: string = locale === "pt-BR" ? "." : ",";
        this.currencyMask = {
          prefix,
          decimalMarker,
          thousandSeparator,
        };
      },
    });
  }

  private buildForm(): void {
    this.form = new FormBuilder().group({
      cep: [
        "",
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      address: new FormBuilder().group({
        street: [""],
        neighborhood: [""],
        state: [""],
        city: [""],
      }),
      id: [null],
      name: ["", [Validators.required]],
      business: ["", [Validators.required]],
      valuation: ["", [Validators.required]],
      cnpj: ["", [Validators.required]],
      active: ["", [Validators.required]],
    });

    this.zipChanges();
  }

  private zipChanges(): void {
    const zip = this.form.get("cep");

    this.changeZip = zip?.valueChanges.subscribe((zip) => {
      if (zip.length === 9) {
        this.form.get("address")?.reset();
        this.getAddress(zip);
      }
    });
  }

  private getPole(id: number): void {
    this.loading = true;

    this.service
      .getPole(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data): void => {
          data.valuation = +data.valuation;
          this.form.patchValue(data);
        },
        error: (err): void => {
          console.dir(err);
        },
      });
  }

  private getAddress(zip: string): void {
    this.loadingAddress = true;

    const addressControl = this.form.get("address");
    addressControl?.disable();

    this.service
      .getZip(zip)
      .pipe(
        finalize(() => {
          this.loadingAddress = false;
        })
      )
      .subscribe({
        next: (address) => {
          if (address.erro) {
            alert(this.locale.message.zipNotFound);
            return;
          }

          addressControl?.setValue({
            street: address.logradouro,
            neighborhood: address.bairro,
            state: address.uf,
            city: address.localidade,
          });
        },
        error: (err) => {
          alert(err?.message || this.locale.message.zipNotFound);
        },
      });
  }
}
