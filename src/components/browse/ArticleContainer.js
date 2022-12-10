import { useState } from "react"
import { ArticleSearch } from "./ArticleSearch"
import { Browse } from "./Browse"

export const ArticleContainer = () => {
    const [searchTerms, setSearchTerms] = useState({
        search: "",
        categoryId: 0,
        subCategoryId: 0
    })


    return<>
        <ArticleSearch
            searchTermState={searchTerms}
            setSearchTerms={setSearchTerms} />
        <Browse searchTermState={searchTerms} />
    </>
}