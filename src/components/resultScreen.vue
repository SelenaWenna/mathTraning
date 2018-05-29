<template>
	<div class="alert alert-primary">
		<h3>Правильных ответов: <br> {{ stats }} из {{ questMax }} </h3>
		<h3>Затрачено времени: <br> {{ time }} секунд</h3>
		<hr>
		<button class="btn btn-primary btn-esc" @click="$emit('repeat')">Повторить</button>
		<button class="btn btn-primary btn-esc" @click="$emit('nextLevel')">Следующий уровень</button>
		<button class="btn btn-primary btn-esc" @click="$emit('toStartScreen')">В начало</button>
	</div>
</template>

<script>
	export default {
		props: ['stats', 'questMax', 'startTime'],
		computed: {
			time() {
				return Math.floor((new Date() - this.startTime) / 1000);
			}
		}
	}
</script>

<style scoped>
	.alert {
		text-align: center;
	}
</style>