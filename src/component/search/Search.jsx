import { AsyncPaginate } from "react-select-async-paginate"
import { useState } from "react"
import { GEO_API_URL, geoApiOptions } from "../../api"

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null)

    const loadOptions = async (inputValue) => {
        const response = await fetch(`${GEO_API_URL}/cities?mainPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
      const response_1 = await response.json()
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }
        }),
      }
      };
        

    const handelOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    } 

    return (
        <div>
            <AsyncPaginate 
                placeholder="Search For City"
                onChange={handelOnChange}
                debounceTimeout={600}
                value={search}
                loadOptions={loadOptions}
            />
        </div>
    )
}
export default Search