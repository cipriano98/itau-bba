export type Locale = "pt-BR" | "en";

export interface LocaleConstant {
  readonly "pt-BR": LocaleConstantPage;
  readonly en: LocaleConstantPage;
}

export interface LocaleConstantPage {
  readonly pole: LocaleConstantPagePole;
}

export interface LocaleConstantPagePole {
  readonly list: LocaleConstantPagePoleList;
  readonly edit: LocaleConstantPagePoleEdit;
}

export interface LocaleConstantPagePoleList extends KeyValue {
  readonly label: {
    search: string;
    name: string;
    business: string;
    valuation: string;
    situation: string;
    action: string;
    [key: string]: any;
  };
  readonly title: {
    polesItau: string;
    mainPolesItau: string;
    [key: string]: any;
  };
  readonly message: {
    noRow: string;
    [key: string]: any;
  };
}

export interface LocaleConstantPagePoleEdit extends KeyValue {
  readonly button: {
    readonly save: string;
    readonly back: string;
  };
  readonly label: {
    loading: string;
    zip: string;
    street: string;
    neighborhood: string;
    state: string;
    city: string;
    name: string;
    business: string;
    cnpj: string;
    valuation: string;
    active: string;
    yes: string;
    no: string;
    [key: string]: any;
  };
  readonly title: {
    pole: string;
    poleDetail: string;
    addressDetail: string;
    companyDetails: string;
    [key: string]: any;
  };
  readonly message: {
    savedSuccessfully: string;
    zipNotFound: string;
    [key: string]: any;
  };
}

export interface KeyValue {
  [key: string]: any;
}
