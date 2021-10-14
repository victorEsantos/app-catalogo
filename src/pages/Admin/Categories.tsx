import React, {useState} from "react";
import {
    View,
    Text,
    Alert,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";
import {createCategory} from "../../services";
import Toast from "react-native-tiny-toast";
import {text, theme} from "../../styles";
import arrow from "../../assets/leftArrow.png";

interface Categories {
    setScreen: Function;
}

const Categories: React.FC<Categories> = (props) => {
    const { setScreen } = props;

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [category, setCategory] = useState({
        name: "",
    });

    function handleSave() {
        !edit && newCategory();
    }

    async function newCategory() {
        setLoading(true);
        const data = {
            ...category,
        };
        try {
            await createCategory(data);
            Toast.showSuccess("Categoria criada com sucesso!");
        } catch (res) {
            Toast.show("Erro ao salvar");
        }
        setLoading(false);
    }


    return (
        <View style={theme.formContainer}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <View style={theme.formCard}>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => setScreen("products")}
                            style={theme.gobackContainer}
                        >
                            <Image source={arrow} />
                            <Text style={text.goBackText}>VOLTAR</Text>
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Nome da categoria"
                            style={theme.formInput}
                            value={category.name}
                            onChangeText={(e) => setCategory({ ...category, name: e })}
                        />
                        <View style={theme.buttonContainer}>
                            <TouchableOpacity
                                style={theme.deleteBtn}
                                onPress={() => {
                                    Alert.alert(
                                        "Deseja cancelar?",
                                        "Os dados inseridos não serão salvos",
                                        [
                                            {
                                                text: "Voltar",
                                                style: "cancel",
                                            },
                                            {
                                                text: "Confirmar",
                                                onPress: () => setScreen("products"),
                                                style: "default",
                                            },
                                        ]
                                    );
                                }}
                            >
                                <Text style={theme.deleteText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={theme.saveBtn}
                                onPress={() => handleSave()}
                            >
                                <Text style={text.saveText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default Categories;
