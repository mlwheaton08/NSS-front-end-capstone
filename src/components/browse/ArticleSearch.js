import { useState, useEffect } from "react"
import "./ArticleSearch.css"

export const ArticleSearch = ({ searchTermState, setSearchTerms }) => {
    const [categoryOptions, setCategoryOptions] = useState([])
    const [subCategoryOptions, setSubCategoryOptions] = useState([])

    useEffect(
        () => {
            const fetchCategories = async () => {
                const response = await fetch('http://localhost:8088/categories')
                const responseJSON = await response.json()
                setCategoryOptions(responseJSON)
            }
            fetchCategories()
        },
        []
    )

    useEffect(
        () => {
            const fetchSubCategories = async () => {
                if (searchTermState.categoryId !== 0) {
                    const response = await fetch(`http://localhost:8088/subCategories?categoryId=${searchTermState.categoryId}`)
                    const responseJSON = await response.json()
                    if (responseJSON.length <= 1) {
                        setSubCategoryOptions([])
                    } else {
                        setSubCategoryOptions(responseJSON)
                    }
                }
            }
            fetchSubCategories()
        },
        [searchTermState.categoryId]
    )

    const getSearch = () => {
        if (searchTermState.search === "no_search") {
            return ""
        } else {
            return searchTermState.search
        }
    }


    return <>
        <form>
            <div>
                <input value={getSearch()}
                    type="text"
                    placeholder="Search..."
                    onChange={
                        (evt) => {
                            const copy = {...searchTermState}
                            copy.search = evt.target.value
                            setSearchTerms(copy)
                        }
                    }
                />
            </div>
            
            <section id="filter">
                <label htmlFor="categories">Category</label>
                <select name="categories" value={searchTermState.categoryId}
                    onChange={
                        (evt) => {
                            const copy = {...searchTermState}
                            copy.categoryId = evt.target.value
                            copy.subCategoryId = ""
                            setSearchTerms(copy)
                        }
                    }
                >
                    <option value=""></option>
                    {
                        categoryOptions.map((category) => {
                            return <option value={category.id} key={`category--${category.id}`}>{category.name}</option>
                        })
                    }
                </select>

                {
                    subCategoryOptions.length <= 1
                        ? ""
                        : <>
                            <label htmlFor="subCategories">Subcategory</label>
                            <select name="subCategories" value={searchTermState.subCategoryId}
                                onChange={
                                    (evt) => {
                                        const copy = {...searchTermState}
                                        copy.subCategoryId = evt.target.value
                                        setSearchTerms(copy)
                                    }
                                }
                            >
                                <option value=""></option>
                                {
                                    subCategoryOptions.map((subCategory) => {
                                        return <option value={subCategory.id} key={`subCategory--${subCategory.id}`}>{subCategory.name}</option>
                                    })
                                }
                            </select>
                        </>
                }
            </section>
        </form>
    </>
}