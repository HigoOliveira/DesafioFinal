/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/user';

/* Presentational */
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from 'components/Input';
import Button from 'components/Button';

/* Styles */
import { colors } from 'styles';
import styles from './styles';

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SCHEDULE',
    headerTitleStyle: styles.headerTitle,
    headerRight: (
      <TouchableOpacity onPress={navigation.state.params ? navigation.state.params.logout : null} >
        <Icon name="sign-out" size={24} color={colors.white} style={styles.headerRight} />
      </TouchableOpacity>
    ),
  });

  state = {
    name: '',
    password: '',
    confirmPassword: '',
  }

  componentDidMount() {
    this.props.navigation.setParams({ logout: () => this.props.logout() });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.panelText}>Minha conta</Text>
        </View>
        <View style={styles.mainContainer}>
          <Input
            onChangeText={(name) => { this.setState({ name }); }}
            value={this.state.name}
            type="none"
            icon="user"
            placeholder="Nome completo"
          />
          <View style={styles.line} />
          <Input
            onChangeText={(password) => { this.setState({ password }); }}
            value={this.state.password}
            type="none"
            icon="lock"
            placeholder="Quer alterar sua senha?"
            secureTextEntry
          />
          <Input
            onChangeText={(confirmPassword) => { this.setState({ confirmPassword }); }}
            value={this.state.confirmPassword}
            type="none"
            icon="lock"
            placeholder="Confirme a senha digitada"
            secureTextEntry
          />
          <Button title="Alterar informações" onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(ActionCreators.userLogout()),
});

export default connect(null, mapDispatchToProps)(Profile);
