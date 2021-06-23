import React, {Component, Fragment} from 'react';
import Header from '../header/header';
import PokemonApi from '../api/api';
import PokemonCard from '../pokemonCard/pokemonCard';
import Paginator from '../paginator/paginator';

export default class CatchedPokemonsPage extends Component {
  state = {
    loading: true,
    pokemons: [],
    currentPage: 1,
    isNothingCatched: true,
  }

  async componentDidMount() {
    const pokemonApi = new PokemonApi();
    const pokemons = await pokemonApi.getCatchedPokemons(this.state.currentPage);
    this.setState({
      loading: false,
      pokemons: pokemons,
    });
  }

  async componentDidUpdate() {
    if (this.state.loading) {
      const pokemonApi = new PokemonApi();
      const pokemons = await pokemonApi.getCatchedPokemons(this.state.currentPage);
      this.setState({
          loading: false,
          pokemons: pokemons,
      });
    }
  }

  next = () => {
    this.setState(state => {
      return ({
        loading: true,
        currentPage: state.currentPage + 1,
      });
    });
  }

  prev = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        loading: true,
        currentPage: this.state.currentPage - 1,
      });
    }
  }

  render() {
    return (
      <>
        <Header/>
        <Paginator next={this.next} prev={this.prev}/>
        <div className="app d-flex flex-wrap justify-content-center">
           {this.state.loading ? <h2>Loading...</h2> : this.state.pokemons.map(pokemon => {
            return <PokemonCard name={pokemon.name} id={pokemon.id} key={pokemon.id} isCatched={pokemon.isCatched}/>
          })}
        </div>
        <Paginator next={this.next} prev={this.prev}/>
      </>
    )
  }
}