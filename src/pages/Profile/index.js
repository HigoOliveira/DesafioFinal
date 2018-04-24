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
import Alert from 'components/Alert';

/* Styles */
import { colors } from 'styles';
import styles from './styles';

class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      setParams: PropTypes.func,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    updateInformation: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };
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

  update = () => {
    const { name, password, confirmPassword } = this.state;
    if (!name && !password && !confirmPassword) {
      Alert.alert('Nada será atualizado enquanto os campos estiverem em branco');
    } else if ((password && !confirmPassword) || (password !== confirmPassword)) { Alert.alert('As senhas precisam ser iguais!'); } else { this.props.updateInformation(name, password, confirmPassword); }
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
          <Button
            title="Alterar informações"
            onPress={this.update}
            loading={this.props.loading}
          />
        </View>
      </View>
    );
  }
}

const mapSTateToProps = state => ({
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(ActionCreators.userLogout()),
  updateInformation: (name, password, confirmPassword) =>
    dispatch(ActionCreators.userUpdateInformation(name, password, confirmPassword)),
});

export default connect(mapSTateToProps, mapDispatchToProps)(Profile);
