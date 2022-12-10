import { useState } from "react"
import { ArticleSearch } from "./ArticleSearch"
import { Browse } from "./Browse"

export const ArticleContainer = () => {
    const [searchTerms, setSearchTerms] = useState({
        search: "",
        categoryId: "",
        subCategoryId: ""
    })


    return<>
        <ArticleSearch
            searchTermState={searchTerms}
            setSearchTerms={setSearchTerms} />
        <Browse searchTermState={searchTerms} />
    </>
}