import React, {Component} from "react";
import {variables} from "../Variables.js";

export class ReadNow extends Component {

    constructor(props){
        super(props);

        this.state={
            genres:[],
            states:[],
            books:[],
            modalTitle:"",
            BookId:0,
            BookName:"",
            BookAuthor:"",
            Genre:"",
            BookStatus:"",

            BookIdFilter:"",
            BookNameFilter:"",
            BookAuthorFilter:"",
            GenreFilter:"",
            booksWithoutFilter:[]
        }
    }

    FilterFn(){
        var BookNameFilter = this.state.BookNameFilter;
        var BookAuthorFilter = this.state.BookAuthorFilter;
        var GenreFilter = this.state.GenreFilter;

        var filteredData=this.state.booksWithoutFilter.filter(
            function(el){
                return el.BookName.toString().toLowerCase().includes(
                    BookNameFilter.toString().trim().toLowerCase()
                )&&
                el.BookAuthor.toString().toLowerCase().includes(
                    BookAuthorFilter.toString().trim().toLowerCase()
                )&&
                el.Genre.toString().toLowerCase().includes(
                    GenreFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({books:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.booksWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({books:sortedData});
    }

    changeBookNameFilter = (e)=>{
        this.state.BookNameFilter=e.target.value;
        this.FilterFn();
    }
    changeBookAuthorFilter = (e)=>{
        this.state.BookAuthorFilter=e.target.value;
        this.FilterFn();
    }
    changeGenreFilter = (e)=>{
        this.state.GenreFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){

        fetch(variables.API_URL+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({books:data, booksWithoutFilter:data});
        });

        fetch(variables.API_URL+'genre')
        .then(response=>response.json())
        .then(data=>{
            this.setState({genres:data});
        });

        fetch(variables.API_URL+'state')
        .then(response=>response.json())
        .then(data=>{
            this.setState({states:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeBookName =(e)=>{
        this.setState({BookName:e.target.value});
    }
    changeBookAuthor =(e)=>{
        this.setState({BookAuthor:e.target.value});
    }
    changeGenre =(e)=>{
        this.setState({Genre:e.target.value});
    }
    changeBookStatus =(e)=>{
        this.setState({BookStatus:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавить книгу",
            BookId:0,
            BookName:"",
            BookAuthor:"",
            Genre:"",
            BookStatus:""
        });
    }
    editClick(bk){
        this.setState({
            modalTitle:"Изменить книгу",
            BookId:bk.BookId,
            BookName:bk.BookName,
            BookAuthor:bk.BookAuthor,
            Genre:bk.Genre,
            BookStatus:bk.BookStatus
        });
    }

    createClick(){
        fetch(variables.API_URL+'book',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookName:this.state.BookName,
                BookAuthor:this.state.BookAuthor,
                Genre:this.state.Genre,
                BookStatus:this.state.BookStatus
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Не удалось');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'book',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookId:this.state.BookId,
                BookName:this.state.BookName,
                BookAuthor:this.state.BookAuthor,
                Genre:this.state.Genre,
                BookStatus:this.state.BookStatus
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Не удалось');
        })
    }

    deleteClick(id){
        if(window.confirm('Вы точно хотите удалить?')){
        fetch(variables.API_URL+'book/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Не удалось');
        })
        }
    }

    render(){
        const {
            genres,
            states,
            books,
            modalTitle,
            BookId,
            BookName,
            BookAuthor,
            Genre,
            BookStatus
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Добавить книгу
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeBookNameFilter}
                placeholder="Фильтр"/>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('BookName',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('BookName',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                    </svg>
                </button>
            </div>
            Название книги
        </th>
        <th>
            <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeBookAuthorFilter}
                placeholder="Фильтр"/>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('BookAuthor',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('BookAuthor',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                    </svg>
                </button>
            </div>
            Автор книги
        </th>
        <th>
            <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeGenreFilter}
                placeholder="Фильтр"/>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('Genre',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('Genre',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                    </svg>
                </button>
            </div>
            Жанр книги
        </th>
        <th>
            Действия
        </th>
    </tr>
    </thead>
    <tbody>
        {books.filter(book => book.BookStatus === "Читаю").map(bk=>
            <tr key={bk.BookId}>
                <td>{bk.BookName}</td>
                <td>{bk.BookAuthor}</td>
                <td>{bk.Genre}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(bk)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(bk.BookId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-100 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Название книги</span>
            <input type="text" className="form-control"
            value={BookName}
            onChange={this.changeBookName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Автор книги</span>
            <input type="text" className="form-control"
            value={BookAuthor}
            onChange={this.changeBookAuthor}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Жанр</span>
            <select className="form-select"
            onChange={this.changeGenre}
            value={Genre}>
                {genres.map(gen=><option key={gen.GenreId}>
                    {gen.GenreName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Статус</span>
            <select className="form-select"
            onChange={this.changeBookStatus}
            value={BookStatus}>
                {states.map(st=><option key={st.StateId}>
                    {st.StateName}
                </option>)}
            </select>
        </div>


     </div>
    
    </div>

    {BookId===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Добавить</button>
        :null}

        {BookId!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Изменить</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>
        )
    }
}