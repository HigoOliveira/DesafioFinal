/* Core */
import React, { Component } from 'react';

/* Presentational */
import {
  Modal as ModalNative,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/event';

import Button from 'components/Button';
import Input from 'components/Input';
import InputDatePicker from 'components/InputDatePicker';
import Alert from 'components/Alert';

import styles from './styles';

class Modal extends Component {
  state = {
    datetime: '',
    name: '',
    where: '',
  }

  closeModal = () => {
    this.props.onCloseModal();
    this.setState({ datetime: '' });
  };

  saveEvent = () => {
    const { datetime, name, where } = this.state;
    if (!datetime || !name || !where) {
      Alert.alert('Você precisa preencher todos os campos para poder adicionar um novo evento!');
    } else {
      this.props.addNew(datetime, name, where);
    }
  }

  render() {
    return (
      <ModalNative
        animationType="slide"
        visible={this.props.visible}
        transparent
        onRequestClose={() => {}}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <InputDatePicker
              placeholder="Selecione a data e o horário"
              date={this.state.datetime}
              onDateChange={(datetime) => { this.setState({ datetime }); }}
              secondary
            />
            <Input
              placeholder="Qual o nome do evento?"
              type="none"
              secondary
              value={this.state.name}
              onChangeText={(name) => { this.setState({ name }); }}
            />
            <Input
              placeholder="Onde irá ocorrer?"
              type="none"
              secondary
              value={this.state.where}
              onChangeText={(where) => { this.setState({ where }); }}
            />

            <Button
              title="Criar evento"
              onPress={this.saveEvent}
            />
            <TouchableOpacity
              onPress={this.closeModal}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText} >Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalNative>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNew: (datetime, name, where) => dispatch(ActionCreators.eventAddNew(datetime, name, where)),
});

export default connect(null, mapDispatchToProps)(Modal);
