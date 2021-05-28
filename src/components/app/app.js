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
            ]
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleProperty = this.onToggleProperty.bind(this);
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

    render() {

        const {data} = this.state;
        const liked = data.filter((item => item.like)).length;
        const allPosts = data.length;


        return ( 
                <div className = "app" >
                    <AppHeader liked={liked} allPosts={allPosts}/>
                    <div div className = "search-panel d-flex">
                        <SearchPanel/>
                        <PostStatusFilter/>
                    </div> 
                    <PostList posts={this.state.data}
                              onDelete={this.deleteItem}
                              onToggleImportant={this.onToggleProperty}
                              onToggleLiked={this.onToggleProperty}/>
                    <PostAddForm onAdd={this.addItem}/>
                </div>    
             )
    }
};

