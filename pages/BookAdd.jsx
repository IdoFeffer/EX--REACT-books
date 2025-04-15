import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { getRandomIntInclusive } from "../services/util.service.js"

const { useState, useEffect } = React

export function BookAdd() {
  const [add, IsAdding] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)
  const [results, setResults] = useState([])

  function handleChange({ target }) {
    setSearchTerm(target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 800)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (!debouncedTerm) return
    googleBookService.query(debouncedTerm).then((results) => {
      console.log("Results from API:", results)
      setResults(results)
    })
  }, [debouncedTerm])

  function onSubmit() {
    setDebouncedTerm(searchTerm)
  }

  function onAddGoogleBook(googleBook){
    console.log('googleBook:', googleBook)
    const newBook = {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        price: getRandomIntInclusive(20, 300),
        thumbnail: (googleBook.volumeInfo.imageLinks && googleBook.volumeInfo.imageLinks.thumbnail) || '',
    }

    bookService.addBook(newBook)
    .then(() => {
        showSuccessMsg('Book added!')
    })
    .catch(err => {
        console.log('error', err);
        showErrorMsg(`Can't add book`)
    })
  }

  return (
    <section>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button onClick={onSubmit}>Submit</button>
      <ul>
        <ul>
          {results.map((book) => (
            <li key={book.id}>
                <h4>{book.volumeInfo.title}</h4>
                <button onClick={() => onAddGoogleBook(book)}>➕</button>
                </li>
          ))}
        </ul>
      </ul>
    </section>
  )
}

// {
//     "kind": "books#volumes",
//     "totalItems": 1000000,
//     "items": [
//       {
//         "kind": "books#volume",
//         "id": "nBuA0hmspdMC",
//         "etag": "1J1ZCPrmuow",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/nBuA0hmspdMC",
//         "volumeInfo": {
//           "title": "Effective JavaScript",
//           "authors": [
//             "David Herman"
//           ],
//           "publisher": "Addison-Wesley",
//           "publishedDate": "2012-11-26",
//           "description": "“It’s uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It’s one of the few books on JS that I’ll recommend without hesitation.” —Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language’s flexible, expressive features and how to avoid its pitfalls. No matter how long you’ve been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma’s JavaScript standardization committee, illuminates the language’s inner workings as never before—helping you take full advantage of JavaScript’s expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you’ll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript’s functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript’s unique “run-to-completion” approach to concurrency",
//           "industryIdentifiers": [
//             {
//               "type": "ISBN_13",
//               "identifier": "9780132902250"
//             },
//             {
//               "type": "ISBN_10",
//               "identifier": "0132902257"
//             }
//           ],
//           "readingModes": {
//             "text": true,
//             "image": true
//           },
//           "pageCount": 231,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "averageRating": 5,
//           "ratingsCount": 1,
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": true,
//           "contentVersion": "2.14.11.0.preview.3",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=nBuA0hmspdMC&pg=PR15&dq=effective+javascript&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=nBuA0hmspdMC&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript.html?hl=&id=nBuA0hmspdMC"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
//           "epub": {
//             "isAvailable": false
//           },
//           "pdf": {
//             "isAvailable": false
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=nBuA0hmspdMC&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... \u003Cb\u003Eeffective\u003C/b\u003E programs. This latter category can be especially subtle, par- ticularly in a language as flexible and expressive as \u003Cb\u003EJavaScript\u003C/b\u003E. This book is concerned with the pragmatics of \u003Cb\u003EJavaScript\u003C/b\u003E. It is not an in- troductory book; I&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "yg0fBAAAQBAJ",
//         "etag": "JxiWtI5vgwc",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/yg0fBAAAQBAJ",
//         "volumeInfo": {
//           "title": "Effective JavaScript　JavaScriptを使うときに知っておきたい68の冴えたやり方",
//           "authors": [
//             "Devid Herman"
//           ],
//           "publisher": "翔泳社",
//           "publishedDate": "2013-02-18",
//           "description": "JavaScriptを使うときに知っておきたい68の冴えたやり方 もはやWebアプリケーション作成のデファクトスタンダードとなった感のある開発言語・JavaScriptが、定番の“Effective”シリーズに、満を持して登場！微妙な挙動に悩むプログラマや、よりシンプルで可読性に富んだコードを志向する開発者に、実践的で即効性のある処方を施してくれる1冊です。68の「なるほど！」は、伊達じゃない。",
//           "industryIdentifiers": [
//             {
//               "type": "ISBN_13",
//               "identifier": "9784798131115"
//             },
//             {
//               "type": "ISBN_10",
//               "identifier": "4798131113"
//             }
//           ],
//           "readingModes": {
//             "text": false,
//             "image": true
//           },
//           "pageCount": 218,
//           "printType": "BOOK",
//           "categories": [
//             "Reference"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": false,
//           "contentVersion": "4.488.1.0.preview.1",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=yg0fBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=yg0fBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "ja",
//           "previewLink": "http://books.google.com/books?id=yg0fBAAAQBAJ&pg=PR5&dq=effective+javascript&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=yg0fBAAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript_JavaScript%E3%82%92%E4%BD%BF%E3%81%86.html?hl=&id=yg0fBAAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": false
//           },
//           "pdf": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/Effective_JavaScript_JavaScript%E3%82%92%E4%BD%BF%E3%81%86-sample-pdf.acsm?id=yg0fBAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=yg0fBAAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... \u003Cb\u003EJavaScript\u003C/b\u003E の入門書なら、ほかに素晴らしい本がある。たとえば Douglas Crockford の『 \u003Cb\u003EJavaScript\u003C/b\u003E : The \u003Cb\u003EGood\u003C/b\u003E Parts 』『 1 や、 Marijn Haverbeke の『 Eloquent \u003Cb\u003EJavaScript\u003C/b\u003E 』* 2 などだ。本書で私が設定した目標は、読者が \u003Cb\u003EJavaScript\u003C/b\u003E を効果的に&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "2rJTEQAAQBAJ",
//         "etag": "0EqmxZwIl1Q",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/2rJTEQAAQBAJ",
//         "volumeInfo": {
//           "title": "JavaScript Algorithms Step by Step: A Practical Guide with Examples",
//           "authors": [
//             "William E. Clark"
//           ],
//           "publisher": "Walzone Press",
//           "publishedDate": "2025-04-04",
//           "description": "\"JavaScript Algorithms Step by Step: A Practical Guide with Examples\" offers an in-depth exploration of JavaScript as a powerful tool for solving algorithmic problems. This book provides readers with a thorough understanding of both basic and complex algorithms, using the flexibility and comprehensiveness of JavaScript to illustrate real-world applications. Whether you are an aspiring developer or a seasoned programmer looking to refine your skills, this guide provides the essential knowledge and practical experience needed to harness JavaScript for algorithm development. Structured to facilitate a step-by-step learning process, the book begins by establishing the core programming concepts and environments necessary for efficient JavaScript coding. Each subsequent chapter builds on this foundation, delving into topics such as variable manipulation, control flow mechanisms, data structures, and recursion. Detailed examples and exercises ensure that readers not only grasp theoretical concepts but also gain practical skills in implementing these concepts with precision. By integrating traditional algorithmic principles with modern JavaScript practices, the book bridges the gap between theoretical and practical coding techniques. Readers will emerge from this book with the capability to design and implement algorithms tailored to specific requirements, using JavaScript's robust features. The guide provides the tools needed to analyze, optimize, and elevate their programming capabilities, turning algorithmic challenges into manageable tasks. This comprehensive resource equips readers to tackle a wide array of computational problems, fostering a deeper understanding of both fundamental and advanced programming concepts and empowering them to develop efficient, scalable JavaScript applications.",
//           "readingModes": {
//             "text": true,
//             "image": true
//           },
//           "pageCount": 243,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": false,
//           "contentVersion": "0.1.1.0.preview.3",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=2rJTEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=2rJTEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=2rJTEQAAQBAJ&pg=PT12&dq=effective+javascript&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=2rJTEQAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/JavaScript_Algorithms_Step_by_Step_A_Pra.html?hl=&id=2rJTEQAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/JavaScript_Algorithms_Step_by_Step_A_Pra-sample-epub.acsm?id=2rJTEQAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "pdf": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/JavaScript_Algorithms_Step_by_Step_A_Pra-sample-pdf.acsm?id=2rJTEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=2rJTEQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... JavaScript. Environment. Establishing an \u003Cb\u003Eefficient JavaScript\u003C/b\u003E development environment is essential for ... effective debugging, and rapid prototyping, which are all critical when working with JavaScript. This section delves&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "4D63DwAAQBAJ",
//         "etag": "yrIKtf8/MWE",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/4D63DwAAQBAJ",
//         "volumeInfo": {
//           "title": "Effective TypeScript",
//           "subtitle": "62 Specific Ways to Improve Your TypeScript",
//           "authors": [
//             "Dan Vanderkam"
//           ],
//           "publisher": "\"O'Reilly Media, Inc.\"",
//           "publishedDate": "2019-10-17",
//           "description": "TypeScript is a typed superset of JavaScript with the potential to solve many of the headaches for which JavaScript is famous. But TypeScript has a learning curve of its own, and understanding how to use it effectively can take time. This book guides you through 62 specific ways to improve your use of TypeScript. Author Dan Vanderkam, a principal software engineer at Sidewalk Labs, shows you how to apply these ideas, following the format popularized by Effective C++ and Effective Java (both from Addison-Wesley). You’ll advance from a beginning or intermediate user familiar with the basics to an advanced user who knows how to use the language well. Effective TypeScript is divided into eight chapters: Getting to Know TypeScript TypeScript’s Type System Type Inference Type Design Working with any Types Declarations and @types Writing and Running Your Code Migrating to TypeScript",
//           "industryIdentifiers": [
//             {
//               "type": "ISBN_13",
//               "identifier": "9781492053699"
//             },
//             {
//               "type": "ISBN_10",
//               "identifier": "1492053694"
//             }
//           ],
//           "readingModes": {
//             "text": true,
//             "image": true
//           },
//           "pageCount": 273,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": true,
//           "contentVersion": "1.3.3.0.preview.3",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=4D63DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=4D63DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=4D63DwAAQBAJ&pg=PT7&dq=effective+javascript&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=4D63DwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Effective_TypeScript.html?hl=&id=4D63DwAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": true
//           },
//           "pdf": {
//             "isAvailable": true
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=4D63DwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... Effective Java and \u003Cb\u003EEffective JavaScript\u003C/b\u003E. If you&#39;re already comfortable working in a few different programming languages, then diving straight into the odd corners of a new one can be an effective way to challenge your mental models and&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "KnbVEAAAQBAJ",
//         "etag": "fpAp+tZu+B4",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/KnbVEAAAQBAJ",
//         "volumeInfo": {
//           "title": "Mastering Javascript",
//           "authors": [
//             "Cybellium"
//           ],
//           "publisher": "Cybellium Ltd",
//           "publishedDate": "2023-09-06",
//           "description": "Cybellium Ltd is dedicated to empowering individuals and organizations with the knowledge and skills they need to navigate the ever-evolving computer science landscape securely and learn only the latest information available on any subject in the category of computer science including: - Information Technology (IT) - Cyber Security - Information Security - Big Data - Artificial Intelligence (AI) - Engineering - Robotics - Standards and compliance Our mission is to be at the forefront of computer science education, offering a wide and comprehensive range of resources, including books, courses, classes and training programs, tailored to meet the diverse needs of any subject in computer science. Visit https://www.cybellium.com for more books.",
//           "industryIdentifiers": [
//             {
//               "type": "ISBN_13",
//               "identifier": "9798859157051"
//             }
//           ],
//           "readingModes": {
//             "text": false,
//             "image": true
//           },
//           "pageCount": 239,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": false,
//           "contentVersion": "0.1.1.0.preview.1",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=KnbVEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=KnbVEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=KnbVEAAAQBAJ&pg=PA95&dq=effective+javascript&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=KnbVEAAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Mastering_Javascript.html?hl=&id=KnbVEAAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": false
//           },
//           "pdf": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/Mastering_Javascript-sample-pdf.acsm?id=KnbVEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=KnbVEAAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "Cybellium. \u003Cb\u003EJavaScript&#39;s\u003C/b\u003E runtime environment, typically a web browser or Node.\u003Cb\u003Ejs\u003C/b\u003E, provides a host of APIs for performing ... \u003Cb\u003Eeffective\u003C/b\u003E, and \u003Cb\u003Eefficient\u003C/b\u003E asynchronous code in \u003Cb\u003EJavaScript\u003C/b\u003E. Before we delve into the nitty-gritty of handling&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "TIlTEQAAQBAJ",
//         "etag": "1ElNyMx4KQ0",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/TIlTEQAAQBAJ",
//         "volumeInfo": {
//           "title": "JavaScript File Handling from Scratch: A Practical Guide with Examples",
//           "authors": [
//             "William E. Clark"
//           ],
//           "publisher": "Walzone Press",
//           "publishedDate": "2025-04-03",
//           "description": "\"JavaScript File Handling from Scratch: A Practical Guide with Examples\" is a meticulously crafted resource dedicated to demystifying file operations within the JavaScript universe. Designed for a diverse audience ranging from aspiring developers to seasoned software engineers, this book presents a structured approach to mastering file handling, blending theoretical foundations with pragmatic insights. Starting with an introduction to essential JavaScript concepts, the book lays down the fundamentals required for effective file manipulation, highlighting the vital role JavaScript plays in both client-side and server-side environments. Each chapter of the book builds on a coherent and progressively complex framework. Readers are first guided through the establishment of a robust development environment, complete with Node.js and necessary tools. Subsequent chapters delve into the Node.js file system module, crucial for managing files efficiently. Detailed discussions cover synchronous and asynchronous programming patterns, ensuring readers are equipped with the knowledge to handle varied performance needs. The book also addresses file system navigation, cross-platform compatibility, monitoring file changes, and event handling, providing a clear pathway through the complexities of file management. Enriched with practical examples, this book offers its readers a hands-on learning experience, reinforcing the theoretical knowledge presented. By the conclusion of the text, readers will not only understand the intricacies of JavaScript file handling but will also be prepared to apply these skills in real-world scenarios. Comprehensive and clear, \"JavaScript File Handling from Scratch\" equips its audience with the necessary tools to navigate the increasingly important domain of JavaScript in file operations, ensuring their readiness to confront and solve modern computational challenges.",
//           "readingModes": {
//             "text": true,
//             "image": true
//           },
//           "pageCount": 91,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": false,
//           "contentVersion": "1.1.1.0.preview.3",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=TIlTEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=TIlTEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=TIlTEQAAQBAJ&pg=PT32&dq=effective+javascript&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=TIlTEQAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/JavaScript_File_Handling_from_Scratch_A.html?hl=&id=TIlTEQAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/JavaScript_File_Handling_from_Scratch_A-sample-epub.acsm?id=TIlTEQAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "pdf": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/JavaScript_File_Handling_from_Scratch_A-sample-pdf.acsm?id=TIlTEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=TIlTEQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... \u003Cb\u003Eeffective JavaScript\u003C/b\u003E file handling. It offers recommendations for configuring code editors to optimize the JavaScript coding experience. Basic and advanced command-line interface commands are introduced to aid efficient navigation&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "ELNTEQAAQBAJ",
//         "etag": "bHGObdnDgD8",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/ELNTEQAAQBAJ",
//         "volumeInfo": {
//           "title": "Node.js Basics for New Developers: A Practical Guide with Examples",
//           "authors": [
//             "William E. Clark"
//           ],
//           "publisher": "Walzone Press",
//           "publishedDate": "2025-04-04",
//           "description": "\"Node.js Basics for New Developers: A Practical Guide with Examples\" offers an in-depth exploration of Node.js, tailored specifically for those new to server-side programming. This book delves into the unique qualities of Node.js, including its event-driven, non-blocking I/O architecture, which sets it apart from traditional server environments. It introduces readers to the vibrant Node.js ecosystem, providing insights into popular libraries, frameworks, and community resources that enhance the development experience. Structured systematically, the book begins with an introduction to essential JavaScript concepts pivotal for Node.js development, progressing through topics such as asynchronous programming, module management, and the intricacies of building RESTful APIs. Each chapter includes practical examples and detailed explanations to reinforce learning. The text also covers crucial practices for error handling, debugging, testing, and optimization to ensure applications are robust, efficient, and secure. Designed for beginners, this guide is meticulously crafted to equip readers with a solid foundation in Node.js. By the end of the book, learners will have acquired the skills to develop scalable, high-performance applications and will be ready to engage more deeply with advanced concepts and community endeavors. \"Node.js Basics for New Developers\" is as much a gateway to understanding this powerful runtime environment as it is a stepping stone to more complex challenges in the software development landscape.",
//           "readingModes": {
//             "text": true,
//             "image": true
//           },
//           "pageCount": 254,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": false,
//           "contentVersion": "0.1.1.0.preview.3",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=ELNTEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=ELNTEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=ELNTEQAAQBAJ&pg=PT45&dq=effective+javascript&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=ELNTEQAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Node_js_Basics_for_New_Developers_A_Prac.html?hl=&id=ELNTEQAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/Node_js_Basics_for_New_Developers_A_Prac-sample-epub.acsm?id=ELNTEQAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "pdf": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/Node_js_Basics_for_New_Developers_A_Prac-sample-pdf.acsm?id=ELNTEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=ELNTEQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... \u003Cb\u003Eeffective JavaScript\u003C/b\u003E. Scope refers to the set of variables accessible in a particular context. In JavaScript, variables declared outside of any function or block are globally available throughout the program, while those declared inside&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "b2bdDwAAQBAJ",
//         "etag": "XwTViAk8U6k",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/b2bdDwAAQBAJ",
//         "volumeInfo": {
//           "title": "JavaScript for Modern Web Development",
//           "subtitle": "Building a Web Application Using HTML, CSS, and JavaScript",
//           "authors": [
//             "Alok Ranjan",
//             "Abhilasha Sinha",
//             "Ranjit Battewad"
//           ],
//           "publisher": "BPB Publications",
//           "publishedDate": "2020-04-18",
//           "description": "Beginner to Expert in Web development with JavaScript: From HTML to React-ReduxÊÊ KEY FEATURESÊ - Acquire web development skills to build independent applicationsÊ - Understand the basics of HTML, CSS, JavaScript, React and Redux - Create build beautiful applications using HTML, CSS, JavaScript, React and Redux - Learn how to debug and unit test your applications properly to build good end products - Follow best practices to write good quality code and build performant applications DESCRIPTIONÊ This book will take you on a complete journey of learning web development, starting right with the basics. The book begins with the history of web development and JavaScript, how it has evolved over these years, and how it still keeps growing with new features. Next, you will learn the basic pillars of web development - HTML, CSS, and JavaScript. You will learn about the functional, object-oriented programming and asynchronous behaviour, and how JavaScript provides for these. Empowered with the basics, you will proceed to learn the new features of JavaScript, ES2015, and the latest ES2019.Ê Next, you will apply your learning to build a real application to see how the Web takes shape.At the end, you will also have an introductory section on ReactJS, one of the modern frameworks for UI development and also develop a simple weather application using React. You will be introduced to Redux as the state container for React applications. This book will conclude with an introductory look at additional topics which can be taken up to become a professional and in building enterprise level applications. WHAT WILL YOU LEARNÊÊ By the end of the book, you will be building real web applications to put your knowledge to practice. This book introduces all the concepts to get started with web application development. To further excel in this field, you really need to practice by building a lot many applications, implementing your own ideas or imitating existing websites. Also remember to practice additional examples provided in the code bundle of the book to master this field. WHO THIS BOOK IS FORÊÊ This book can be used by people who are completely new to software development and want to get into front-end web development by starting from basics. This book can also be used by JavaScript users for a quick reference to the fundamentals of HTML, CSS, JS, and learn ReactJS with Redux, as well as the new features in JavaScript ES2019. Table of Contents 1. History of JS and how it has revolutionized web development 2. HTML: Creating Web ContentÊ 3. CSS: Making content beautiful 4. JavaScript Programming: Making application Interactive 5. Functional programming with JavaScript 6. Object-Oriented JavaScript 7. Asynchronous Programming 8. WhatÕs new in ES2019 JavaScript 9. Building an application with JavaScript 10. Debugging JavaScript Applications 11. Unit test automation 12. Build and Deploy an Application 13. JavaScript Best Practices 14. Introduction to React 15. Building an application with ReactÊ 16. State Management in React applications 17. Debugging, Testing, and Deploying React applications 18. What is next - for becoming a pro?",
//           "industryIdentifiers": [
//             {
//               "type": "ISBN_13",
//               "identifier": "9789389328721"
//             },
//             {
//               "type": "ISBN_10",
//               "identifier": "9389328721"
//             }
//           ],
//           "readingModes": {
//             "text": true,
//             "image": true
//           },
//           "pageCount": 436,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": true,
//           "contentVersion": "1.2.2.0.preview.3",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=b2bdDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=b2bdDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=b2bdDwAAQBAJ&pg=PT193&dq=effective+javascript&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=b2bdDwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/JavaScript_for_Modern_Web_Development.html?hl=&id=b2bdDwAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/JavaScript_for_Modern_Web_Development-sample-epub.acsm?id=b2bdDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "pdf": {
//             "isAvailable": true,
//             "acsTokenLink": "http://books.google.com/books/download/JavaScript_for_Modern_Web_Development-sample-pdf.acsm?id=b2bdDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=b2bdDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... JavaScript when the execution was done by basic interpreters , to the engines available now which are much more performant and \u003Cb\u003Eeffective\u003C/b\u003E , \u003Cb\u003EJavaScript\u003C/b\u003E has come a really long way . Let&#39;s first learn about the different parts of the JavaScript&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "l8dcCgAAQBAJ",
//         "etag": "jYcOGMb2Yco",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/l8dcCgAAQBAJ",
//         "volumeInfo": {
//           "title": "Beautiful JavaScript",
//           "subtitle": "Leading Programmers Explain How They Think",
//           "authors": [
//             "Anton Kovalyov"
//           ],
//           "publisher": "\"O'Reilly Media, Inc.\"",
//           "publishedDate": "2015-08-13",
//           "description": "JavaScript is arguably the most polarizing and misunderstood programming language in the world. Many have attempted to replace it as the language of the Web, but JavaScript has survived, evolved, and thrived. Why did a language created in such hurry succeed where others failed? This guide gives you a rare glimpse into JavaScript from people intimately familiar with it. Chapters contributed by domain experts such as Jacob Thornton, Ariya Hidayat, and Sara Chipps show what they love about their favorite language—whether it’s turning the most feared features into useful tools, or how JavaScript can be used for self-expression. Contributors include: Angus Croll Jonathan Barronville Sara Chipps Marijn Haverbeke Ariya Hidayat Daryl Koopersmith Anton Kovalyov Rebecca Murphey Daniel Pupius Graeme Roberts Jenn Schiffer Jacob Thornton Ben Vinegar Rick Waldron Nicholas Zakas",
//           "industryIdentifiers": [
//             {
//               "type": "ISBN_13",
//               "identifier": "9781449371173"
//             },
//             {
//               "type": "ISBN_10",
//               "identifier": "1449371175"
//             }
//           ],
//           "readingModes": {
//             "text": false,
//             "image": true
//           },
//           "pageCount": 167,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": false,
//           "contentVersion": "0.1.1.0.preview.1",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=l8dcCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=l8dcCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=l8dcCgAAQBAJ&pg=PA154&dq=effective+javascript&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=l8dcCgAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Beautiful_JavaScript.html?hl=&id=l8dcCgAAQBAJ"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED",
//           "epub": {
//             "isAvailable": false
//           },
//           "pdf": {
//             "isAvailable": true
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=l8dcCgAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... jQuery Fundamentals, contributed to the jQuery Cookbook (O&#39;Reilly), and served as a technical reviewer for Garann Means&#39;s Node for Front-End Developers (O&#39;Reilly) and David Herman&#39;s \u003Cb\u003EEffective JavaScript\u003C/b\u003E (Addison-Wesley Professio- nal)&nbsp;..."
//         }
//       },
//       {
//         "kind": "books#volume",
//         "id": "t1TBcJ9-LrUC",
//         "etag": "EUzlYa/yYj8",
//         "selfLink": "https://www.googleapis.com/books/v1/volumes/t1TBcJ9-LrUC",
//         "volumeInfo": {
//           "title": "Adapting to Web Standards",
//           "subtitle": "CSS and Ajax for Big Sites",
//           "authors": [
//             "Christopher Schmitt",
//             "Kimberly Blessing",
//             "Rob Cherny",
//             "Meryl Evans",
//             "Kevin Lawver",
//             "Mark Trammell"
//           ],
//           "publisher": "New Riders",
//           "publishedDate": "2011-12-14",
//           "description": "After learning the language of design, how does one effectively use standards-based technologies to create visually strong Web sites? The full-color Adapting to Web Standards: CSS and Ajax for Big Sites gives developers a peek into the process of the best designers in the world through the work of high profile, real-world Web sites that made them famous. The book focuses on deconstructing these top-tier large-scale sites with particular attention given to deconstructing CSS.",
//           "industryIdentifiers": [
//             {
//               "type": "ISBN_13",
//               "identifier": "9780132704724"
//             },
//             {
//               "type": "ISBN_10",
//               "identifier": "0132704722"
//             }
//           ],
//           "readingModes": {
//             "text": true,
//             "image": true
//           },
//           "pageCount": 473,
//           "printType": "BOOK",
//           "categories": [
//             "Computers"
//           ],
//           "averageRating": 4,
//           "ratingsCount": 1,
//           "maturityRating": "NOT_MATURE",
//           "allowAnonLogging": false,
//           "contentVersion": "1.10.7.0.preview.3",
//           "panelizationSummary": {
//             "containsEpubBubbles": false,
//             "containsImageBubbles": false
//           },
//           "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=t1TBcJ9-LrUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=t1TBcJ9-LrUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=t1TBcJ9-LrUC&pg=PT130&dq=effective+javascript&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=t1TBcJ9-LrUC&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Adapting_to_Web_Standards.html?hl=&id=t1TBcJ9-LrUC"
//         },
//         "saleInfo": {
//           "country": "IL",
//           "saleability": "NOT_FOR_SALE",
//           "isEbook": false
//         },
//         "accessInfo": {
//           "country": "IL",
//           "viewability": "PARTIAL",
//           "embeddable": true,
//           "publicDomain": false,
//           "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
//           "epub": {
//             "isAvailable": false
//           },
//           "pdf": {
//             "isAvailable": false
//           },
//           "webReaderLink": "http://play.google.com/books/reader?id=t1TBcJ9-LrUC&hl=&as_pt=BOOKS&source=gbs_api",
//           "accessViewStatus": "SAMPLE",
//           "quoteSharingAllowed": false
//         },
//         "searchInfo": {
//           "textSnippet": "... \u003Cb\u003EJavaScript\u003C/b\u003E and into the href attribute to create real links as a part of the conversion to more “POSH” HTML above ... \u003Cb\u003Eeffective\u003C/b\u003E separation of structure and behavior is to assign a CSS class to elements that require scripting to be&nbsp;..."
//         }
//       }
//     ]
//   }
