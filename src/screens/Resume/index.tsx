import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HistoryCard from "../../components/HistoryCard";
import { Container, Header, Title, Content } from "./styles";
import { DataListProps } from "../Dashboard";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

type CategoryData = {
  name: string;
  total: string;
  color: string;
};

export default function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const { user } = useAuth();

  async function loadData() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter(
      (item: DataListProps) => item.type === "negative"
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: DataListProps) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          name: category.name,
          total: categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          color: category.color,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.name}
            color={item.color}
            title={item.name}
            amount={item.total}
          />
        ))}
      </Content>
    </Container>
  );
}
