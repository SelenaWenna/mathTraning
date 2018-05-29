<template>
	<div class="alert alert-secondary">
		<h3>Выберите действие</h3>
		<button class="btn btn-success" @click="$emit('toChooseLevel', 0)">
			Сложение
		</button>
		<button class="btn btn-success" @click="$emit('toChooseLevel', 1)">
			Вычитание
		</button>
		<button class="btn btn-success" @click="$emit('toChooseLevel', 2)">
			Умножение
		</button>
		<button class="btn btn-success" @click="$emit('toChooseLevel', 3)">
			Деление
		</button>
	</div>
</template>

<script>
	export default {
	}
</script>

<style scoped>
	.alert {
		text-align: center;
	}

	.btn {
		width: calc(100% - 30px);
	}
</style>