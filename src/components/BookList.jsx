import SingleBook from './SingleBook'
import { Col, Form, Row } from 'react-bootstrap'
import CommentArea from './CommentArea'
import { useState } from 'react'

// books = fantasy
const BookList = (books) => {
  
  const [query, setQuery] = useState("")
  const [sbook, setSbook] = useState(null)



const changeSelectedBook = (asin) => {

    setSbook(asin)
  }

    return (
      <>
        <Row>
          <Col md={8}>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    value={query}
                    onChange={(e) =>
                      setQuery({ searchQuery: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {books
                .filter((b) =>
                  b.title.toLowerCase().includes(query)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      selectedBook={sbook}
                      changeSelectedBook={changeSelectedBook}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col md={4}>
            <CommentArea asin={sbook} />
          </Col>
        </Row>
      </>
    )
}

export default BookList
