import React,{Component} from 'react';
import {variables} from '../Variables.js';

export class Genres extends Component{

    constructor(props){
        super(props);

        this.state={
            genres:[],
            modalTitle:"",
            GenreName:"",
            GenreId:0,

            GenreIdFilter:"",
            GenreNameFilter:"",
            genresWithoutFilter:[]
        }
    }

    FilterFn(){
        var GenreIdFilter=this.state.GenreIdFilter;
        var GenreNameFilter = this.state.GenreNameFilter;

        var filteredData=this.state.genresWithoutFilter.filter(
            function(el){
                return el.GenreId.toString().toLowerCase().includes(
                    GenreIdFilter.toString().trim().toLowerCase()
                )&&
                el.GenreName.toString().toLowerCase().includes(
                    GenreNameFilter.toString().trim().toLowerCase()
                )
            }
        );
        
        this.setState({genres:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.genresWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({genres:sortedData});
    }

    changeGenreIdFilter = (e)=>{
        this.state.GenreIdFilter=e.target.value;
        this.FilterFn();
    }
    changeGenreNameFilter = (e)=>{
        this.state.GenreNameFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'genre')
        .then(response=>response.json())
        .then(data=>{
            this.setState({genres:data, genresWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeGenreName =(e)=>{
        this.setState({GenreName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавить жанр",
            GenreId:0,
            GenreName:""
        });
    }
    editClick(gen){
        this.setState({
            modalTitle:"Изменить жанр",
            GenreId:gen.GenreId,
            GenreName:gen.GenreName
        });
    }

    createClick(){
        fetch(variables.API_URL+'genre',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                GenreName:this.state.GenreName
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
        fetch(variables.API_URL+'genre',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                GenreId:this.state.GenreId,
                GenreName:this.state.GenreName
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
        if(window.confirm('Вы уверены?')){
        fetch(variables.API_URL+'genre/'+id,{
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
            modalTitle,
            GenreId,
            GenreName
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Добавить жанр
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">
                <input className="form-control m-2"
                onChange={this.changeGenreNameFilter}
                placeholder="Фильтр"/>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('GenreName',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-outline-ligh"
                onClick={()=>this.sortResult('GenreName',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                    </svg>
                </button>

            </div>
            Название жанра
      
        </th>
        <th>
            Действия
        </th>
    </tr>
    </thead>
    <tbody>
        {genres.map(gen=>
            <tr key={gen.GenreId}>
                <td>{gen.GenreName}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(gen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(gen.GenreId)}>
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
       <div className="input-group mb-3">
        <span className="input-group-text">Название жанра</span>
        <input type="text" className="form-control"
        value={GenreName}
        onChange={this.changeGenreName}/>
       </div>

        {GenreId===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Добавить</button>
        :null}

        {GenreId!==0?
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