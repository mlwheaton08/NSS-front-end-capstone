import { useState, useEffect } from "react"

export const ArticleSearch = ({ searchTerms, setSearchTerms }) => {
    const [categoryOptions, setCategoryOptions] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState("")
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
                const response = await fetch(`http://localhost:8088/subCategories?categoryId=${selectedCategoryId}`)
                const responseJSON = await response.json()
                setSubCategoryOptions(responseJSON)
            }
            fetchSubCategories()
        },
        [selectedCategoryId]
    )

    return <>
        <form>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={
                        (evt) => {
                            setSearchTerms(evt.target.value)
                        }
                    }
                />
            </div>

            <label htmlFor="categories">Category</label>
            <select name="categories"
                onChange={
                    (evt) => {
                        const copy = {...setSearchTerms}
                        copy.categoryId = evt.target.value
                        setSearchTerms(copy)
                        setSelectedCategoryId(evt.target.value)
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

            <>
                {
                    !selectedCategoryId || subCategoryOptions[0].name === "No subcategory"
                        ? ""
                        : <>
                            <label htmlFor="subCategories">Subcategory</label>
                            <select name="subCategories"
                                onChange={
                                    (evt) => {
                                        const copy = {...setSearchTerms}
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
            </>
        </form>
    </>
}