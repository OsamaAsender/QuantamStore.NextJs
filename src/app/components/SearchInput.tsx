// components/SearchInput.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { SearchInputProps } from '../types/inputs'

export default function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="relative w-full sm:w-full mt-5">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-3 top-2.5 text-gray-400 text-sm mt-1"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
  )
}
