declare type HashMap<T> = {
  [propname: string]: T;
}

declare type IOneSlide = {
  control: any;
  props: HashMap<any>;
  next: any;
}

declare type ISlides<T> = {
  [propname: string]: T
}


declare type IPresentation = {
  currentSlide: string;
  countClients: number; 
  className: string;
}

declare type ITypeMsg = {
  type: string;
  data: any;
}

declare type ICallbackMsg = (msg:ITypeMsg)=>void;