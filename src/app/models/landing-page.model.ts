export interface NavLink {
  href: string;
  label: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  cta: string;
}

export interface Typology {
  tipo: string;
  area: string;
  descricao: string[];
  preco: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}
