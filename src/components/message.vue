<template>
	<div class="alert" :class="'alert-' + type">
		<h3> {{ text }} </h3>
		<hr>
		<button class="btn btn-primary"
			@click="$emit('onNext')"
		> 
			Продолжить
		</button>
	</div>
</template>

<script>
	export default {
		props: ['type', 'text']
	}
</script>

<style scoped>
	.alert {
		text-align: center;
	}
</style>