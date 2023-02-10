enum Color {
    RED,
    PINK,
    BLUE
}

const pink: Color = Color.PINK;

const enum Color2 { // 常量枚举会在编译阶段被删除
    RED,
    PINK,
    BLUE
}

const color2: Color2[] = [Color2.RED, Color2.PINK, Color2.BLUE];
