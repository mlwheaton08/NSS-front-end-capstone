import { useState } from "react"
import { useParams } from "react-router-dom"
import { ArticleSearch } from "./ArticleSearch"
import { Browse } from "./Browse"

export const ArticleContainer = () => {
    const {categoryId} = useParams()
    const {subCategoryId} = useParams()
    const {search} = useParams()

    const [searchTerms, setSearchTerms] = useState({
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        search: search
    })


    return<>
        <ArticleSearch
            searchTermState={searchTerms}
            setSearchTerms={setSearchTerms} />
        <Browse searchTermState={searchTerms} />
    </>
}