// Class for search functionality.
// It will be passed to the projectController with desired query and query string parameters.
class APIFeatures {

    // These two parameters will equal the query (Mongo query for example Product.find()) and 
    // queryString (req.query).
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // If there is a query in the URL (req.query), search the database for a 
    // project that contains the query value in the specified fields below (case insensitively).
    // Otherwise return an empty object.
    search() {

        const keyword = this.queryStr.keyword ? {
            $or: [
                {name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                    }
                },
                {languages:
                    {$elemMatch:
                        {language: {
                            $regex: this.queryStr.keyword,
                            $options: 'i'
                            }
                        }
                    }
                },
                {frameworks:
                    {$elemMatch:
                        {framework: {
                            $regex: this.queryStr.keyword,
                            $options: 'i'
                            }
                        }
                    }
                },
                {database: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                    }
                },
                {libraries:
                    {$elemMatch:
                        {library: {
                            $regex: this.queryStr.keyword,
                            $options: 'i'
                            }
                        }
                    }
                },
                {other:
                    {$elemMatch:
                        {item: {
                            $regex: this.queryStr.keyword,
                            $options: 'i'
                            }
                        }
                    }
                }
            ]
        } : {}

        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
}

module.exports = APIFeatures;