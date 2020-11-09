import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import shadow from "../../style/shadow";
import Spacing from "../../style/spacing";
import Modal from "../Modal";
import type {
  ListTypes,
  SelectSizes,
  Option,
  DropdownProps,
  ModalSizes,
} from ".";
import FlatList from "./FlatList";
import SectionList from "./SectionList";
import DismissKeyboard from "./DismissKeyboard";
import TextInput from "../input/TextInput";
import Select from "./Select";
import AddOption from "./AddOption";

const SELECT_STYLE: { [key in SelectSizes]: ViewStyle } = {
  small: { width: 160 },
  medium: { width: 287 },
  large: {},
};

type InheritedProps = Omit<
  DropdownProps,
  "onClose" | "onSelectChange" | "onAddOptionPress"
>;

interface PickerScreenProps extends InheritedProps {
  size: SelectSizes;
  modalSize: ModalSizes;
  listType: ListTypes;
  showDropdown: boolean;
  showOptions: () => void;
  hideOptions: () => void;
  onSelectOption: (option: Option) => void;
  search: string;
  onSearchChange: (search: string) => void;
  onAddOption: () => void;
}

const PickerScreen: React.FC<PickerScreenProps> = ({
  label,
  placeholder,
  size,
  options,
  favoriteOptions,
  selectedOption,
  SelectComponent,
  selectContainerStyle,
  disabled,
  addOptionEnabled,
  addOptionTitle,
  onAddOption,
  alphabeticScrollEnabled,
  searchPlaceholder,
  listEmptyText,
  error,
  modalSize,
  listType,
  showDropdown,
  showOptions,
  hideOptions,
  onSelectOption,
  search,
  onSearchChange,
}) => {
  const [top, setTop] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setTop(y + height);
  };

  return (
    <>
      {SelectComponent ? (
        SelectComponent({
          label,
          placeholder,
          selectedOption,
          showOptions,
          disabled,
          error,
        })
      ) : (
        <Select
          label={label}
          placeholder={placeholder}
          selectContainerStyle={selectContainerStyle}
          disabled={disabled}
          error={error}
          size={size}
          showOptions={showOptions}
          selectedOption={selectedOption}
          onLayout={onLayout}
        />
      )}

      {showDropdown && (
        <Modal
          animationType="none"
          onClose={hideOptions}
          backgroundColor="transparent"
        >
          <View
            style={[
              styles.modal,
              { top, maxHeight: Dimensions.get("window").height - top },
              SELECT_STYLE[size],
            ]}
          >
            <DismissKeyboard>
              <>
                {modalSize === "responsive" && (
                  <FlatList
                    options={options}
                    selectedOption={selectedOption}
                    onSelectOption={onSelectOption}
                    listEmptyText={listEmptyText}
                    search={search}
                    needsPaddingTop={true}
                  />
                )}
                {modalSize === "fullscreen" && (
                  <View style={styles.flex}>
                    <TextInput
                      containerStyle={styles.input}
                      placeholder={searchPlaceholder}
                      onChangeText={onSearchChange}
                      type="search"
                    />
                    {addOptionEnabled && !!search && (
                      <AddOption
                        onAddOptionPress={onAddOption}
                        addOptionTitle={addOptionTitle}
                      />
                    )}
                    <View style={styles.flex}>
                      {listType === "flatList" && (
                        <FlatList
                          options={options}
                          selectedOption={selectedOption}
                          onSelectOption={onSelectOption}
                          listEmptyText={listEmptyText}
                          search={search}
                        />
                      )}
                      {listType === "sectionList" && (
                        <SectionList
                          options={options}
                          favoriteOptions={favoriteOptions}
                          selectedOption={selectedOption}
                          onSelectOption={onSelectOption}
                          listEmptyText={listEmptyText}
                          search={search}
                          alphabeticScrollEnabled={alphabeticScrollEnabled}
                        />
                      )}
                    </View>
                  </View>
                )}
              </>
            </DismissKeyboard>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    left: Spacing.sp3,
    right: Spacing.sp3,
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    ...shadow({ x: 0, y: 0, opacity: 0.1, blurRadius: 14 }),
    zIndex: 200,
    flex: 1,
  },
  input: {
    paddingVertical: Spacing.sp3,
    paddingHorizontal: Spacing.sp3,
    backgroundColor: "#ffffff",
    zIndex: 10,
  },
  flex: { flex: 1 },
});

export default PickerScreen;
