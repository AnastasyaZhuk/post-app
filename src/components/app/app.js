import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                    label: 'Going to learn ReactJS',
                    important: false,
                    like : false,
                    id: 1
                },
                {
                    label: 'That is so good',
                    important: true,
                    like : false,
                    id: 2
                },
                {
                    label: 'I need a break...',
                    important: false,
                    like : false,
                    id: 3
                }
            ],

            term: '',
            filter: 'all'
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleProperty = this.onToggleProperty.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect =  this.onFilterSelect.bind(this);
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data : newArr
            }
        }) 
    }

    addItem(body) {
        const newItem =  {
            label : body,
            important : false,
            id : this.maxId++
        }

        this.setState(({data}) => {
            const newArray = [...data, newItem];

            return {
                data : newArray
            }
        }) 
    }

    onToggleProperty(id, propertyName) {

        this.setState(({data}) => {
            const index = data.findIndex((element) => element.id === id);
            const old = data[index];

            const newItem = {
                ...old,
            };

            if(propertyName === 'important') {
                newItem['important'] = !old[propertyName];
            }
            else if(propertyName === 'like'){
                newItem['like'] = !old[propertyName];
            }

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    filterPosts(items, filter) {
        if (filter === 'like') {
            return items.filter((item) => item.like);
        } else {
            return items;
        }
    }

    searchPosts(items, term) {
        if(term.length === 0){
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {

        const {data, term, filter} = this.state;
        const liked = data.filter((item => item.like)).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPosts(this.searchPosts(data, term), filter);

        return ( 
                <div className = "app" >
                    <AppHeader liked={liked} allPosts={allPosts}/>
                    <div className="search-panel d-flex">
                        <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                        />
                        <PostStatusFilter
                            filter={filter}
                            onFilterSelect={this.onFilterSelect}
                        />
                    </div> 
                    <PostList posts={visiblePosts}
                              onDelete={this.deleteItem}
                              onToggleImportant={this.onToggleProperty}
                              onToggleLiked={this.onToggleProperty}/>
                    <PostAddForm onAdd={this.addItem}/>
                </div>    
             )
    }
};

