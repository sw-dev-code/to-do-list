/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Icon } from 'react-native-elements';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

const { height, width } = Dimensions.get("window");

class App extends React.Component {
  state = {
    toDoItems: [
      {
        text: 'Completion of your Gsquad profile - 5 mins',
        checked: true,
      },
      {
        text: 'Video screen call - 30 mins ',
        checked: true,
      },
      {
        text: 'Technical Exercise',
        checked: false,
      },
      {
        text: 'Technical interview call ',
        checked: false,
      },
      {
        text: 'Final call',
        checked: false,
      },
      {
        text: 'Signature of the Master Agreement with Gsquad ',
        checked: false,
      },
      {
        text: 'Enrollment to the Gsquad community ',
        checked: false,
      },
    ],
    addToDoModalVisible: false,
    editToDoModalVisible: false,
    editingToDoIndex: 0,
    toDoText: "",
    toDoChecked: false,
  }

  handleToDoClicked(index) {
    this.setState({editingToDoIndex: index})
    this.setState({
      toDoText: this.state.toDoItems[index].text,
      toDoChecked: this.state.toDoItems[index].checked
    })
    this.displayEditToDoModal(true);
  }

  handleAddToDoClicked() {
    this.displayAddToDoModal(true);
  }

  handleAddToDoModalClose() {
    this.displayAddToDoModal(false);
  }

  displayAddToDoModal(show){
    this.setState({addToDoModalVisible: show})
  }

  handleEditToDoModalClose() {
    this.displayEditToDoModal(false);
    this.setState({
      toDoText: "",
      toDoChecked: false
    })
  }

  displayEditToDoModal(show){
    this.setState({editToDoModalVisible: show})
  }

  handleSaveToDoClicked() {
    this.displayAddToDoModal(false);
    const newToDo = {
      text: this.state.toDoText,
      checked: false
    }
    this.setState(prevState => ({
      toDoItems: [...prevState.toDoItems, newToDo],
      toDoText: "",
      toDoChecked: false
    }))
  }

  handleDeleteToDoButtonClicked() {
    this.handleEditToDoModalClose();
    const index = this.state.editingToDoIndex;
    this.setState((prevState) => ({
      toDoItems: prevState.toDoItems.filter((_, i) => i !== index)
    }));
  }

  handleChangeStatusToDoButtonClicked() {
    const index = this.state.editingToDoIndex;
    this.setState(prevState => {
      const newToDoItems = [...prevState.toDoItems];
      newToDoItems[index].checked = ! prevState.toDoItems[index].checked;
      return {toDoItems: newToDoItems};
    })
  }

  addToDoBackButton = () => (
    <TouchableOpacity style={styles.modalButton} onPress={() => this.handleAddToDoModalClose()}>
      <Icon
        name="arrow-left-circle-outline" 
        type="material-community"
        size={40}
        color="#35605A"
      />
    </TouchableOpacity>
  );

  editToDoBackButton = () => (
    <TouchableOpacity style={styles.modalButton} onPress={() => this.handleEditToDoModalClose()}>
      <Icon
        name="arrow-left-circle-outline" 
        type="material-community"
        size={40}
        color="#35605A"
      />
    </TouchableOpacity>
  );

  changeStatusToDoButton() {
    if(this.state.toDoChecked) {
      return (
        <TouchableOpacity style={styles.modalButton} onPress={() => this.handleChangeStatusToDoButtonClicked()}>
          <Icon
            name="check-circle-outline" 
            type="material-community"
            size={40}
            color="#35605A"
          />
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity style={styles.modalButton} onPress={() => this.handleChangeStatusToDoButtonClicked()}>
          <Icon
            name="checkbox-blank-circle-outline" 
            type="material-community"
            size={40}
            color="#35605A"
          />
        </TouchableOpacity>
      )
    }
  }

  saveToDoButton = () => (
    <TouchableOpacity style={styles.saveToDoButton} onPress={() => this.handleSaveToDoClicked()}>
      <Icon
        name="content-save-outline" 
        type="material-community"
        size={40}
        color="#35605A"
      />
    </TouchableOpacity>
  );

  deleteToDoButton = () => (
    <TouchableOpacity style={styles.modalButton} onPress={() => this.handleDeleteToDoButtonClicked()}>
      <Icon
        name="delete-circle-outline" 
        type="material-community"
        size={40}
        color="#35605A"
      />
    </TouchableOpacity>
  );

  render () {
    return (
      <SafeAreaView style={styles.container}>
      <View style={{maxHeight:"80%"}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 0
          }}
        >
          <View
            style={styles.list}
          >
            <Text style={styles.titleText}>To Do List:</Text>
            {
              this.state.toDoItems.map((item, index) => {
                return (
                  <BouncyCheckbox style={{marginTop: 30}} key={index}
                    isChecked={item.checked}
                    text={item.text}
                    disableBuiltInState
                    onPress={() =>
                      this.handleToDoClicked(index)
                    }
                  />
                )
              })
            }
          </View>
        </ScrollView>
        </View>
        <TouchableOpacity style={styles.addToDoButton} onPress={() => this.handleAddToDoClicked()}>
          <Icon
            type="material-community"
            size={60}
            name="plus-circle-outline"
            color="#31e981"
          />
        </TouchableOpacity>

        <Modal
          animationType = {"fade"}
          transparent={true}
          visible={this.state.addToDoModalVisible}
          onRequestClose={() => {
            this.handleAddToDoModalClose();
            }}>
          <View style={styles.modalBackground}>
            <View style={styles.addToDoModal}>
                {this.addToDoBackButton()}
              <Text style={{ fontFamily: 'open-sans-regular', paddingTop: 15, width: '100%' }}
                color="black">New Task
              </Text>
              <TextInput
                  color="black"
                  value={this.state.toDoText}
                  multiline={true}
                  numberOfLines={5}
                  placeholder="Task Description"
                  onChangeText={(text) => {
                    this.setState({toDoText: text})
                  }}
                  style={styles.textInput}
              />
              <View style= {{alignItems: 'center'}}>
                {this.saveToDoButton()}
              </View>
            </View>
          </View>
        </Modal>  

        <Modal
          animationType = {"fade"}
          transparent={true}
          visible={this.state.editToDoModalVisible}
          onRequestClose={() => {
            this.handleEditToDoModalClose();
            }}>
          <View style={styles.modalBackground}>
            <View style={styles.editToDoModal}>
              <View style= {{flexDirection: "row", justifyContent:'space-between'}}>
                {this.editToDoBackButton()}
                {this.changeStatusToDoButton()}
                {this.deleteToDoButton()}
              </View>
              <Text style={{ fontFamily: 'open-sans-regular', paddingTop: 15, width: '100%' }}
                color="black">Edit Task
              </Text>
              <TextInput
                  color="black"
                  value={this.state.toDoText}
                  multiline={true}
                  numberOfLines={5}
                  placeholder="Task Description"
                  style={styles.textInput}
                  onChangeText={(text) => {
                    this.setState(prevState => {
                      const newToDoItems = [...prevState.toDoItems];
                      newToDoItems[this.state.editingToDoIndex].text = text;
                      return {toDoItems: newToDoItems};
                    })
                    this.setState({toDoText: text})
                  }}
              />
            </View>
          </View>
        </Modal>        

      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#00120B"
  },
  list: {
    backgroundColor: "#00120B",
    paddingTop: height*0.1,
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: "#D8E4FF"
  },
  addToDoButton: {
    position: 'absolute',
    bottom: height*0.05,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 10, 
    backgroundColor: "#D8E4FF", 
    borderRadius: 6,
  },
  modalButton: {
    width: 40, 
    height: 40, 
  },
  saveToDoButton: {
    width: 40, 
    height: 40,
    marginTop: 10
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  addToDoModal: {
    backgroundColor: "white",
    width: width*0.8,
    height: height*0.4,
    padding: 16,
    borderRadius: 6,
    shadowColor: "black",
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  editToDoModal: {
    backgroundColor: "white",
    width: width*0.8,
    height: height*0.35,
    padding: 16,
    borderRadius: 6,
    shadowColor: "black",
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
});

export default App;
