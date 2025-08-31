import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

export const AuthScreen: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, signIn } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("エラー", "メールアドレスとパスワードを入力してください");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      Alert.alert("エラー", "パスワードが一致しません");
      return;
    }

    if (isSignUp && password.length < 6) {
      Alert.alert("エラー", "パスワードは6文字以上で入力してください");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        console.log("サインアップ試行:", email);
        const { data, error } = await signUp(email, password);
        console.log("サインアップ結果:", { data, error });
        if (error) {
          // サインアップのエラーメッセージをより分かりやすく
          let errorMessage = "アカウント作成に失敗しました";
          if (error.message.includes("User already registered")) {
            errorMessage =
              "このメールアドレスは既に登録されています。\n\nログイン画面でログインしてください。";
          } else if (error.message.includes("Password should be at least")) {
            errorMessage = "パスワードは6文字以上で入力してください。";
          } else if (error.message.includes("Invalid email")) {
            errorMessage = "有効なメールアドレスを入力してください。";
          } else if (
            error.message.includes("Unable to validate email address")
          ) {
            errorMessage = "メールアドレスの形式が正しくありません。";
          } else {
            errorMessage = error.message;
          }
          Alert.alert("アカウント作成エラー", errorMessage);
        }
        // 成功時はアラートを表示せず、自動的にオンボーディング画面に遷移
      } else {
        console.log("サインイン試行:", email);
        const { data, error } = await signIn(email, password);
        console.log("サインイン結果:", { data, error });
        if (error) {
          // エラーメッセージをより分かりやすく
          let errorMessage = "ログインに失敗しました";
          if (error.message.includes("Invalid login credentials")) {
            errorMessage =
              "メールアドレスまたはパスワードが正しくありません。\n\nアカウントをお持ちでない場合は、まずアカウント作成を行ってください。";
          } else if (error.message.includes("Email not confirmed")) {
            errorMessage =
              "メールアドレスの確認が必要です。\n\n登録時に送信されたメールの確認リンクをクリックしてください。";
          } else if (error.message.includes("Too many requests")) {
            errorMessage =
              "ログイン試行回数が多すぎます。\n\nしばらく時間をおいてから再度お試しください。";
          } else {
            errorMessage = error.message;
          }
          Alert.alert("ログインエラー", errorMessage);
        }
      }
    } catch (error) {
      console.log("認証エラー:", error);
      Alert.alert("エラー", "認証に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isSignUp ? "アカウント作成" : "ログイン"}
        </Text>
        <Text style={styles.subtitle}>
          資産管理アプリで将来の資産を管理しましょう
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>メールアドレス</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>パスワード</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="パスワードを入力"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>パスワード確認</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="パスワードを再入力"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.authButton, loading && styles.authButtonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text style={styles.authButtonText}>
              {loading ? "処理中..." : isSignUp ? "アカウント作成" : "ログイン"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isSignUp
              ? "すでにアカウントをお持ちですか？"
              : "アカウントをお持ちでないですか？"}
          </Text>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.switchButton}>
              {isSignUp ? "ログイン" : "アカウント作成"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ヘルプテキスト */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            {isSignUp
              ? "初回利用の方はこちらでアカウントを作成してください"
              : "既存のアカウントでログインしてください"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  authButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  authButtonDisabled: {
    backgroundColor: "#ccc",
  },
  authButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  switchText: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  switchButton: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "600",
  },
  helpContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  helpText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },
});
