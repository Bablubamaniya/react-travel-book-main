import { useSearchParams } from "react-router";


function useQueryParams(...keys){
    const searchParams = useSearchParams();

    const result = [];
    keys.forEach(function(keys){
        result.push(searchParams[0].get(keys));
    });
    return result;
}
export default useQueryParams;