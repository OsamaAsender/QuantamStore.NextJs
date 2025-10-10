export interface Option {
    value: string
    label: string
  }
  
  export interface SelectFilterProps {
    label: string
    options: Option[]
    value: Option | null
    onChange: (option: Option | null) => void
  }
  